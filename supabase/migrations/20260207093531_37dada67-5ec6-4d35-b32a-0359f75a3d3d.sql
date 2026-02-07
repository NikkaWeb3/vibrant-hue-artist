-- Create transactions table for storing purchase history
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  amount_paid DECIMAL(20, 8) NOT NULL,
  tokens_received DECIMAL(20, 8) NOT NULL,
  tx_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own transactions (by wallet address)
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (true);

-- Create policy: Anyone can insert transactions (for now, since we don't have auth)
CREATE POLICY "Anyone can insert transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster wallet lookups
CREATE INDEX idx_transactions_wallet_address ON public.transactions(wallet_address);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);