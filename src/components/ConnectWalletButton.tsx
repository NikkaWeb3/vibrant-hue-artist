import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown } from 'lucide-react';

interface ConnectWalletButtonProps {
  className?: string;
  variant?: 'default' | 'presale' | 'header';
}

export const ConnectWalletButton = ({ 
  className = '', 
  variant = 'default' 
}: ConnectWalletButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                if (variant === 'presale') {
                  return (
                    <Button
                      onClick={openConnectModal}
                      className={`w-full h-14 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity ${className}`}
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Wallet
                    </Button>
                  );
                }
                
                if (variant === 'header') {
                  return (
                    <Button
                      onClick={openConnectModal}
                      className={`bg-primary/20 text-primary border border-primary/30 font-semibold px-5 h-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-all ${className}`}
                    >
                      Connect
                    </Button>
                  );
                }

                return (
                  <Button
                    onClick={openConnectModal}
                    className={`bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${className}`}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="destructive"
                    className={className}
                  >
                    Wrong network
                  </Button>
                );
              }

              // Connected state
              if (variant === 'presale') {
                return (
                  <div className="space-y-3">
                    <button
                      onClick={openChainModal}
                      className="w-full flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {chain.hasIcon && chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span className="text-foreground font-medium">{chain.name}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="w-full flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <span className="text-foreground font-medium">{account.displayName}</span>
                      <span className="text-muted-foreground text-sm">
                        {account.displayBalance ? account.displayBalance : ''}
                      </span>
                    </button>
                  </div>
                );
              }

              if (variant === 'header') {
                return (
                  <button
                    onClick={openAccountModal}
                    className={`flex items-center gap-2 bg-card border border-border rounded-full px-3 h-9 hover:bg-muted transition-colors ${className}`}
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <span className="text-foreground text-sm font-medium">
                      {account.displayName}
                    </span>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-1 bg-muted rounded-lg px-3 py-2 hover:bg-muted/80 transition-colors"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button
                    onClick={openAccountModal}
                    className={`bg-card border border-border rounded-lg px-4 py-2 hover:bg-muted transition-colors ${className}`}
                  >
                    <span className="text-foreground text-sm font-medium">
                      {account.displayName}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
