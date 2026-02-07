import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const networks = [
  { id: "eth", name: "ETH", icon: "⟠" },
  { id: "bnb", name: "BNB", icon: "◆" },
  { id: "sol", name: "SOL", icon: "◎" },
];

export const PurchaseWidget = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("eth");
  const [amount, setAmount] = useState("");

  const seqAmount = parseFloat(amount || "0") * 12500;
  const raised = 847520;
  const goal = 1500000;
  const progress = (raised / goal) * 100;

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

      {/* Network Selection */}
      <div className="flex gap-2 mb-4">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => setSelectedNetwork(network.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedNetwork === network.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {network.icon} {network.name}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="space-y-3">
        <Input
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-muted/50 border-border/50 h-12"
        />
        <div className="flex justify-between text-sm px-1">
          <span className="text-muted-foreground">You receive</span>
          <span className="text-foreground font-medium">{seqAmount.toLocaleString()} $SEQ</span>
        </div>
      </div>

      <Button className="w-full h-12 mt-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
        Buy Now
      </Button>
    </div>
  );
};
