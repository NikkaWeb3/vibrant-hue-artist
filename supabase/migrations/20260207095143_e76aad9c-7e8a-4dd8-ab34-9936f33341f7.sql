-- Drop overly permissive policies
DROP POLICY IF EXISTS "Allow public read access" ON public.transactions;
DROP POLICY IF EXISTS "Allow public insert access" ON public.transactions;
DROP POLICY IF EXISTS "Allow public update access" ON public.transactions;

-- Create secure RLS policies for transactions table
-- Users can only view their own transactions (matched by wallet_address)
CREATE POLICY "Users can view own transactions" 
ON public.transactions 
FOR SELECT 
USING (true); -- We keep public read for now since wallet_address is the identifier, not user_id

-- Only authenticated requests can insert transactions (from edge functions or authenticated users)
CREATE POLICY "Authenticated users can insert transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (true); -- Transactions are created by the app, wallet_address is set by the app

-- Restrict this more - actually we need to think about this
-- Since this is a presale app without user auth, transactions are tied to wallet addresses
-- The app should validate transactions server-side

-- For now, let's create a more restrictive approach:
-- 1. INSERT should be allowed only with valid wallet_address format
-- 2. UPDATE should be restricted (no updates after creation)
-- 3. DELETE should be disabled

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Authenticated users can insert transactions" ON public.transactions;

-- SELECT: Anyone can read transactions (public presale data, no auth in the app)
-- This is acceptable for a presale where transaction data is meant to be transparent
CREATE POLICY "Public read access for transparency" 
ON public.transactions 
FOR SELECT 
USING (true);

-- INSERT: Restrict to service role only (edge functions)
-- This prevents direct client-side fake transaction creation
CREATE POLICY "Service role can insert transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- UPDATE: Restrict to service role only
CREATE POLICY "Service role can update transactions" 
ON public.transactions 
FOR UPDATE 
USING (auth.role() = 'service_role');

-- DELETE: No deletion allowed
CREATE POLICY "No deletion of transactions" 
ON public.transactions 
FOR DELETE 
USING (false);