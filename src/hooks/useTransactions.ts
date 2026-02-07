import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { supabase } from '@/integrations/supabase/client';
import type { PaymentMethod } from '@/lib/presale';

export interface Transaction {
  id: string;
  wallet_address: string;
  chain_id: number;
  payment_method: string;
  amount_paid: number;
  tokens_received: number;
  tx_hash: string | null;
  status: string;
  created_at: string;
}

interface UseTransactionsResult {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  saveTransaction: (data: {
    chainId: number;
    paymentMethod: PaymentMethod;
    amountPaid: number;
    tokensReceived: number;
    txHash: string | null;
    status: string;
  }) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useTransactions = (): UseTransactionsResult => {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!address) {
      setTransactions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_address', address.toLowerCase())
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  const saveTransaction = useCallback(async (data: {
    chainId: number;
    paymentMethod: PaymentMethod;
    amountPaid: number;
    tokensReceived: number;
    txHash: string | null;
    status: string;
  }) => {
    if (!address) return;

    try {
      const { error: insertError } = await supabase
        .from('transactions')
        .insert({
          wallet_address: address.toLowerCase(),
          chain_id: data.chainId,
          payment_method: data.paymentMethod,
          amount_paid: data.amountPaid,
          tokens_received: data.tokensReceived,
          tx_hash: data.txHash,
          status: data.status,
        });

      if (insertError) throw insertError;

      // Refetch to get the latest data
      await fetchTransactions();
    } catch (err) {
      console.error('Error saving transaction:', err);
      throw err;
    }
  }, [address, fetchTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    saveTransaction,
    refetch: fetchTransactions,
  };
};
