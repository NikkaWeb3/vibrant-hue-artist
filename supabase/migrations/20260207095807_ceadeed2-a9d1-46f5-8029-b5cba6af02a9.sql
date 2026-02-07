-- Add database constraints for data integrity
ALTER TABLE public.transactions 
ADD CONSTRAINT check_amount_positive CHECK (amount_paid > 0);

ALTER TABLE public.transactions 
ADD CONSTRAINT check_tokens_positive CHECK (tokens_received > 0);

ALTER TABLE public.transactions 
ADD CONSTRAINT check_chain_id CHECK (chain_id IN (1, 56));

ALTER TABLE public.transactions 
ADD CONSTRAINT check_payment_method CHECK (payment_method IN ('native', 'usdt', 'usdc'));

ALTER TABLE public.transactions 
ADD CONSTRAINT check_status CHECK (status IN ('pending', 'success', 'failed', 'completed'));

ALTER TABLE public.transactions 
ADD CONSTRAINT check_wallet_format CHECK (wallet_address ~ '^0x[a-fA-F0-9]{40}$');

-- Update trigger function to explicitly specify SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SECURITY INVOKER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;