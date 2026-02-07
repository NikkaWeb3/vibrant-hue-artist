import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const networks = [
  { id: "eth", name: "ETH", icon: "⟠" },
  { id: "bnb", name: "BNB", icon: "◆" },
  { id: "sol", name: "SOL", icon: "◎" },
];

export const PresaleCard = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("eth");
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

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
  const seqAmount = parseFloat(amount || "0") * 12500;

  return (
    <div className="glass-card p-6 lg:p-8 w-full max-w-md">
      {/* Phase Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm font-medium text-secondary">Phase 1 Active</span>
        </div>
        <span className="text-xs text-muted-foreground">1 $SEQ = $0.00008</span>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl lg:text-3xl font-bold text-foreground">
              {value.toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{unit}</p>
          </div>
        ))}
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
      <div className="flex gap-2 mb-4">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => setSelectedNetwork(network.id)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
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

      {/* Amount Input */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-muted/50 border-border/50 h-14 text-lg pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {networks.find((n) => n.id === selectedNetwork)?.name}
          </span>
        </div>
        <div className="flex justify-between text-sm px-1">
          <span className="text-muted-foreground">You will receive</span>
          <span className="text-foreground font-medium">{seqAmount.toLocaleString()} $SEQ</span>
        </div>
      </div>

      {/* Buy Button */}
      <Button className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
        Connect Wallet
      </Button>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Min: 0.01 {networks.find((n) => n.id === selectedNetwork)?.name} • Max: 50 {networks.find((n) => n.id === selectedNetwork)?.name}
      </p>
    </div>
  );
};
