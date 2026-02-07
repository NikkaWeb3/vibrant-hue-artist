import { mainnet, bsc } from 'wagmi/chains';

// Placeholder addresses - replace with actual deployed contract addresses
export const PRESALE_CONTRACT_ADDRESS = {
  [mainnet.id]: '0x0000000000000000000000000000000000000000' as const,
  [bsc.id]: '0x0000000000000000000000000000000000000000' as const,
} as const;

// Stablecoin addresses
export const USDT_ADDRESS = {
  [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as const, // ETH USDT
  [bsc.id]: '0x55d398326f99059fF775485246999027B3197955' as const, // BSC USDT
} as const;

export const USDC_ADDRESS = {
  [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as const, // ETH USDC
  [bsc.id]: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as const, // BSC USDC
} as const;

// ERC20 ABI for approve and transfer
export const ERC20_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8' }],
  },
] as const;

// Presale contract ABI - minimal interface for buying tokens
// Replace with full ABI when contract is deployed
export const PRESALE_ABI = [
  {
    name: 'buyWithNative',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'buyWithToken',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'tokenPrice',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'tokensPerNative',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const;

// Payment methods
export type PaymentMethod = 'native' | 'usdt' | 'usdc';

export const PAYMENT_METHODS: Record<PaymentMethod, { label: string; decimals: number }> = {
  native: { label: 'Native', decimals: 18 },
  usdt: { label: 'USDT', decimals: 6 },
  usdc: { label: 'USDC', decimals: 6 },
};

// Token rate (tokens per 1 USD equivalent)
export const SEQ_PER_USD = 12500;

// Min/Max purchase limits in USD equivalent
export const MIN_PURCHASE_USD = 10;
export const MAX_PURCHASE_USD = 50000;
