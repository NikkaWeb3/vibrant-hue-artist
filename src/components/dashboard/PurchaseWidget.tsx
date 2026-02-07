import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { usePurchase } from "@/hooks/usePurchase";
import { useTransactions } from "@/hooks/useTransactions";
import { type PaymentMethod, SEQ_PER_USD, MIN_PURCHASE_USD, MAX_PURCHASE_USD } from "@/lib/presale";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const networks = [
  { id: mainnet.id, name: "ETH", icon: "⟠", nativePrice: 3500 },
  { id: bsc.id, name: "BNB", icon: "◆", nativePrice: 600 },
];

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: "native", label: "Native" },
  { id: "usdt", label: "USDT" },
  { id: "usdc", label: "USDC" },
];

export const PurchaseWidget = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("native");
  
  const { saveTransaction } = useTransactions();
  
  const { status, error, tokensReceived, purchase, reset } = usePurchase({
    onSuccess: async (data) => {
      await saveTransaction({
        chainId: data.chainId,
        paymentMethod: data.paymentMethod,
        amountPaid: data.amountPaid,
        tokensReceived: data.tokensReceived,
        txHash: data.txHash,
        status: 'completed',
      });
    },
  });

  const currentNetwork = networks.find(n => n.id === chainId) || networks[0];
  
  const seqAmount = useMemo(() => {
    const numAmount = parseFloat(amount || "0");
    if (selectedPayment === "native") {
      const usdValue = numAmount * currentNetwork.nativePrice;
      return usdValue * SEQ_PER_USD;
    }
    return numAmount * SEQ_PER_USD;
  }, [amount, selectedPayment, currentNetwork.nativePrice]);

  const raised = 847520;
  const goal = 1500000;
  const progress = (raised / goal) * 100;

  const handleNetworkChange = (networkId: number) => {
    if (networkId !== chainId) {
      switchChain?.({ chainId: networkId });
    }
  };

  const handleBuy = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    await purchase(amount, selectedPayment);
  };

  const handleReset = () => {
    reset();
    setAmount("");
  };

  const getPaymentLabel = () => {
    if (selectedPayment === "native") {
      return currentNetwork.name;
    }
    return selectedPayment.toUpperCase();
  };

  const isLoading = status === "approving" || status === "purchasing";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Buy $SEQ</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm text-secondary font-medium">Phase 1</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>${raised.toLocaleString()}</span>
          <span>${goal.toLocaleString()}</span>
        </div>
      </div>

      {isSuccess ? (
        <div className="text-center py-6">
          <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-3" />
          <p className="text-foreground font-medium mb-1">Purchase Successful!</p>
          <p className="text-muted-foreground text-sm mb-4">
            You received {tokensReceived.toLocaleString()} $SEQ
          </p>
          <Button onClick={handleReset} variant="outline" className="w-full">
            Make Another Purchase
          </Button>
        </div>
      ) : (
        <>
          {/* Network Selection */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Select Network</p>
            <div className="flex gap-2">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleNetworkChange(network.id)}
                  disabled={isLoading}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    chainId === network.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  } disabled:opacity-50`}
                >
                  {network.icon} {network.name}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Pay With</p>
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  disabled={isLoading}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPayment === method.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  } disabled:opacity-50`}
                >
                  {method.id === "native" ? currentNetwork.name : method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                className="bg-muted/50 border-border/50 h-12 pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {getPaymentLabel()}
              </span>
            </div>
            <div className="flex justify-between text-sm px-1">
              <span className="text-muted-foreground">You receive</span>
              <span className="text-foreground font-medium">
                {seqAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} $SEQ
              </span>
            </div>
          </div>

          {/* Error */}
          {isError && error && (
            <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buy Button */}
          <Button 
            onClick={handleBuy}
            disabled={!isConnected || isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full h-12 mt-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {status === "approving" ? "Approving..." : "Processing..."}
              </>
            ) : !isConnected ? (
              "Connect Wallet"
            ) : (
              "Buy Now"
            )}
          </Button>

          {/* Limits */}
          <p className="text-xs text-muted-foreground text-center mt-3">
            Min: ${MIN_PURCHASE_USD} • Max: ${MAX_PURCHASE_USD.toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
};
