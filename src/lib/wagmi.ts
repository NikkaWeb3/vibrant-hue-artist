import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, bsc } from 'wagmi/chains';
import {
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
  phantomWallet,
} from '@rainbow-me/rainbowkit/wallets';

// WalletConnect Project ID
const projectId = '37b4f63979c2589eaf4c73fe6f44db96';

export const config = getDefaultConfig({
  appName: 'Sequoia Protocol',
  projectId,
  chains: [mainnet, bsc],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rainbowWallet,
        phantomWallet,
      ],
    },
  ],
});
