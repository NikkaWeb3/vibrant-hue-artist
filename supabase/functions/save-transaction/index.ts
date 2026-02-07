import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface TransactionData {
  chainId: number;
  walletAddress: string;
  paymentMethod: string;
  amountPaid: number;
  tokensReceived: number;
  txHash: string | null;
  status: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body: TransactionData = await req.json();
    
    console.log('Saving transaction:', {
      chainId: body.chainId,
      walletAddress: body.walletAddress,
      paymentMethod: body.paymentMethod,
      amountPaid: body.amountPaid,
      tokensReceived: body.tokensReceived,
      status: body.status,
    });

    // Validate required fields
    if (!body.walletAddress || !body.chainId || !body.paymentMethod) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate wallet address format (basic check for Ethereum-like addresses)
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletRegex.test(body.walletAddress)) {
      console.error('Invalid wallet address format:', body.walletAddress);
      return new Response(
        JSON.stringify({ error: 'Invalid wallet address format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate numeric values
    if (typeof body.amountPaid !== 'number' || body.amountPaid <= 0) {
      console.error('Invalid amount_paid:', body.amountPaid);
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (typeof body.tokensReceived !== 'number' || body.tokensReceived <= 0) {
      console.error('Invalid tokens_received:', body.tokensReceived);
      return new Response(
        JSON.stringify({ error: 'Invalid tokens amount' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Insert transaction using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        chain_id: body.chainId,
        wallet_address: body.walletAddress.toLowerCase(),
        payment_method: body.paymentMethod,
        amount_paid: body.amountPaid,
        tokens_received: body.tokensReceived,
        tx_hash: body.txHash,
        status: body.status,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save transaction' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Transaction saved successfully:', data.id);

    return new Response(
      JSON.stringify({ success: true, transaction: data }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});