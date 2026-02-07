import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, bsc } from 'wagmi/chains';
import { ConnectWalletButton } from "./ConnectWalletButton";
import { usePurchase } from "@/hooks/usePurchase";
import { useTransactions } from "@/hooks/useTransactions";
import { type PaymentMethod, SEQ_PER_USD } from "@/lib/presale";
import { Loader2, CheckCircle, XCircle, ExternalLink } from "lucide-react";

const networks = [
  { id: "eth", name: "ETH", icon: "⟠", chainId: mainnet.id },
  { id: "bnb", name: "BNB", icon: "◆", chainId: bsc.id },
];

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: 'native', label: 'Native' },
  { id: 'usdt', label: 'USDT' },
  { id: 'usdc', label: 'USDC' },
];

export const PresaleCard = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { saveTransaction } = useTransactions();
  
  const { status, error, txHash, tokensReceived, amountPaid, currentPaymentMethod, purchase, reset } = usePurchase({
    onSuccess: async (data) => {
      // Save transaction to database
      try {
        await saveTransaction({
          chainId: data.chainId,
          paymentMethod: data.paymentMethod,
          amountPaid: data.amountPaid,
          tokensReceived: data.tokensReceived,
          txHash: data.txHash,
          status: 'success',
        });
      } catch (err) {
        console.error('Failed to save transaction:', err);
      }
    },
  });
  
  const [selectedNetwork, setSelectedNetwork] = useState("eth");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('native');
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Sync network selection with connected chain
  useEffect(() => {
    if (isConnected) {
      const network = networks.find(n => n.chainId === chainId);
      if (network) {
        setSelectedNetwork(network.id);
      }
    }
  }, [chainId, isConnected]);

  // Update payment method label based on network
  useEffect(() => {
    if (selectedPayment === 'native') {
      // Native is already handled by network selection
    }
  }, [selectedNetwork, selectedPayment]);

  const handleNetworkChange = (networkId: string) => {
    setSelectedNetwork(networkId);
    const network = networks.find(n => n.id === networkId);
    if (network && isConnected && switchChain) {
      switchChain({ chainId: network.chainId });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const raised = 847520;
  const goal = 1500000;
  const progress = (raised / goal) * 100;
  
  // Calculate tokens based on payment method
  const calculateSeqAmount = () => {
    const numAmount = parseFloat(amount || "0");
    if (selectedPayment === 'native') {
      // For native: ETH ~$3500, BNB ~$600
      const nativePrice = selectedNetwork === 'eth' ? 3500 : 600;
      return numAmount * nativePrice * SEQ_PER_USD;
    }
    // For stablecoins: 1:1 with USD
    return numAmount * SEQ_PER_USD;
  };

  const seqAmount = calculateSeqAmount();

  const getPaymentLabel = () => {
    if (selectedPayment === 'native') {
      return networks.find(n => n.id === selectedNetwork)?.name || 'ETH';
    }
    return selectedPayment.toUpperCase();
  };

  const handlePurchase = async () => {
    await purchase(amount, selectedPayment);
  };

  const handleTryAgain = () => {
    reset();
  };

  // Success state
  if (status === 'success') {
    return (
    <div className="glass-card p-6 lg:p-8 w-full max-w-[420px]">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Purchase Successful!</h3>
          <p className="text-muted-foreground mb-4">
            You will receive <span className="text-primary font-semibold">{tokensReceived.toLocaleString()} $SEQ</span>
          </p>
          {txHash && (
            <a 
              href={`https://${selectedNetwork === 'bnb' ? 'bscscan.com' : 'etherscan.io'}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
            >
              View transaction <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <Button 
            onClick={handleTryAgain}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            Buy More
          </Button>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
    <div className="glass-card p-6 lg:p-8 w-full max-w-[420px]">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Transaction Failed</h3>
          <p className="text-muted-foreground mb-6 text-sm">{error}</p>
          <Button 
            onClick={handleTryAgain}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 lg:p-8 w-full max-w-[420px]">
      {/* Phase Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm font-medium text-secondary">Phase 1 Active</span>
        </div>
        <span className="text-xs text-muted-foreground">1 $SEQ = $0.00008</span>
      </div>

      {/* Accepted Currencies Badge */}
      <div className="flex items-center justify-center gap-1 mb-6 py-2 px-3 rounded-lg bg-muted/30 border border-border/50">
        <span className="text-xs text-muted-foreground">Pay with</span>
        <span className="text-xs font-medium text-foreground">ETH • BNB • USDT • USDC</span>
      </div>

      {/* Countdown - Compact style */}
      <div className="flex items-center justify-center gap-2 mb-6 py-3 px-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
        <span className="text-lg font-bold text-foreground">
          {timeLeft.days.toString().padStart(2, "0")}d
        </span>
        <span className="text-primary/60 font-medium">:</span>
        <span className="text-lg font-bold text-foreground">
          {timeLeft.hours.toString().padStart(2, "0")}h
        </span>
        <span className="text-primary/60 font-medium">:</span>
        <span className="text-lg font-bold text-foreground">
          {timeLeft.minutes.toString().padStart(2, "0")}m
        </span>
        <span className="text-primary/60 font-medium">:</span>
        <span className="text-lg font-bold text-foreground">
          {timeLeft.seconds.toString().padStart(2, "0")}s
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Raised</span>
          <span className="text-foreground font-medium">${raised.toLocaleString()} / ${goal.toLocaleString()}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">{progress.toFixed(1)}% Complete</p>
      </div>

      {/* Network Selection */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-medium">1</span>
          Select Network
        </p>
        <div className="flex gap-2">
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => handleNetworkChange(network.id)}
              disabled={status === 'purchasing' || status === 'approving'}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
                selectedNetwork === network.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="mr-1">{network.icon}</span>
              {network.name}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method Selection - Always visible */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-medium">2</span>
          Pay With
        </p>
        <div className="flex gap-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              disabled={status === 'purchasing' || status === 'approving'}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-50 ${
                selectedPayment === method.id
                  ? "bg-secondary/20 text-secondary border border-secondary/30"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {method.id === 'native' ? (selectedNetwork === 'eth' ? 'ETH' : 'BNB') : method.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={status === 'purchasing' || status === 'approving'}
            className="bg-muted/50 border-border/50 h-14 text-lg pr-20 disabled:opacity-50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {getPaymentLabel()}
          </span>
        </div>
        <div className="flex justify-between text-sm px-1">
          <span className="text-muted-foreground">You will receive</span>
          <span className="text-foreground font-medium">{seqAmount.toLocaleString()} $SEQ</span>
        </div>
      </div>

      {/* Connect/Buy Button */}
      {isConnected ? (
        <Button 
          onClick={handlePurchase}
          className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={!amount || parseFloat(amount) <= 0 || status === 'purchasing' || status === 'approving'}
        >
          {status === 'approving' && (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Approving...
            </>
          )}
          {status === 'purchasing' && (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          )}
          {status === 'idle' && 'Buy $SEQ'}
        </Button>
      ) : (
        <ConnectWalletButton variant="presale" />
      )}

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Min: $10 • Max: $50,000
      </p>
    </div>
  );
};
