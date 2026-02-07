import { useState, useCallback } from 'react';
import { useAccount, useChainId, useSendTransaction, useWriteContract } from 'wagmi';
import { parseEther, parseUnits } from 'viem';
import { mainnet, bsc } from 'wagmi/chains';
import {
  PRESALE_CONTRACT_ADDRESS, 
  USDT_ADDRESS, 
  USDC_ADDRESS, 
  ERC20_ABI, 
  PRESALE_ABI,
  type PaymentMethod,
  SEQ_PER_USD,
  MIN_PURCHASE_USD,
  MAX_PURCHASE_USD,
} from '@/lib/presale';

export type PurchaseStatus = 'idle' | 'approving' | 'purchasing' | 'success' | 'error';

interface UsePurchaseResult {
  status: PurchaseStatus;
  error: string | null;
  txHash: string | null;
  tokensReceived: number;
  purchase: (amount: string, paymentMethod: PaymentMethod) => Promise<void>;
  reset: () => void;
}

// Demo mode flag - set to false when contract is deployed
const DEMO_MODE = true;

// Mock native currency prices in USD
const NATIVE_PRICES: Record<number, number> = {
  [mainnet.id]: 3500, // ETH price in USD
  [bsc.id]: 600,      // BNB price in USD
};

export const usePurchase = (): UsePurchaseResult => {
  const { address } = useAccount();
  const chainId = useChainId();
  
  const [status, setStatus] = useState<PurchaseStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [tokensReceived, setTokensReceived] = useState(0);

  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const getTokenAddress = useCallback((method: PaymentMethod): `0x${string}` | null => {
    if (method === 'native') return null;
    
    const addresses = method === 'usdt' ? USDT_ADDRESS : USDC_ADDRESS;
    return addresses[chainId as keyof typeof addresses] ?? null;
  }, [chainId]);

  const calculateTokensReceived = useCallback((amount: string, paymentMethod: PaymentMethod): number => {
    const numAmount = parseFloat(amount) || 0;
    
    if (paymentMethod === 'native') {
      // Convert native to USD, then to tokens
      const nativePrice = NATIVE_PRICES[chainId] ?? 3000;
      const usdValue = numAmount * nativePrice;
      return usdValue * SEQ_PER_USD;
    }
    
    // USDT/USDC are already in USD
    return numAmount * SEQ_PER_USD;
  }, [chainId]);

  const validatePurchase = useCallback((amount: string, paymentMethod: PaymentMethod): string | null => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      return 'Please enter a valid amount';
    }

    // Calculate USD equivalent
    let usdValue: number;
    if (paymentMethod === 'native') {
      const nativePrice = NATIVE_PRICES[chainId] ?? 3000;
      usdValue = numAmount * nativePrice;
    } else {
      usdValue = numAmount;
    }

    if (usdValue < MIN_PURCHASE_USD) {
      return `Minimum purchase is $${MIN_PURCHASE_USD}`;
    }

    if (usdValue > MAX_PURCHASE_USD) {
      return `Maximum purchase is $${MAX_PURCHASE_USD}`;
    }

    return null;
  }, [chainId]);

  const purchase = useCallback(async (amount: string, paymentMethod: PaymentMethod) => {
    if (!address) {
      setError('Please connect your wallet');
      setStatus('error');
      return;
    }

    // Validate
    const validationError = validatePurchase(amount, paymentMethod);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    const tokens = calculateTokensReceived(amount, paymentMethod);
    setTokensReceived(tokens);

    try {
      if (DEMO_MODE) {
        // Demo mode - simulate transaction
        setStatus('purchasing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTxHash('0x' + Math.random().toString(16).slice(2, 66));
        setStatus('success');
        return;
      }

      const presaleAddress = PRESALE_CONTRACT_ADDRESS[chainId as keyof typeof PRESALE_CONTRACT_ADDRESS];
      if (!presaleAddress || presaleAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('Presale contract not deployed on this network');
      }

      if (paymentMethod === 'native') {
        // Buy with ETH/BNB
        setStatus('purchasing');
        
        const hash = await sendTransactionAsync({
          to: presaleAddress,
          value: parseEther(amount),
        });
        
        setTxHash(hash);
        setStatus('success');
      } else {
        // Buy with USDT/USDC
        const tokenAddress = getTokenAddress(paymentMethod);
        if (!tokenAddress) {
          throw new Error('Token not available on this network');
        }

        // Step 1: Approve
        setStatus('approving');
        const decimals = paymentMethod === 'usdt' ? 6 : 6;
        const tokenAmount = parseUnits(amount, decimals);
        
        await writeContractAsync({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [presaleAddress, tokenAmount],
        } as any);

        // Step 2: Buy
        setStatus('purchasing');
        const hash = await writeContractAsync({
          address: presaleAddress,
          abi: PRESALE_ABI,
          functionName: 'buyWithToken',
          args: [tokenAddress, tokenAmount],
        } as any);

        setTxHash(hash);
        setStatus('success');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setStatus('error');
    }
  }, [address, chainId, validatePurchase, calculateTokensReceived, sendTransactionAsync, writeContractAsync, getTokenAddress]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setTxHash(null);
    setTokensReceived(0);
  }, []);

  return {
    status,
    error,
    txHash,
    tokensReceived,
    purchase,
    reset,
  };
};
