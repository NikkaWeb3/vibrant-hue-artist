import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, bsc } from 'wagmi/chains';
import {
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
  phantomWallet,
} from '@rainbow-me/rainbowkit/wallets';

// WalletConnect Project ID - get yours at https://cloud.walletconnect.com
const projectId = 'demo-project-id';

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
