import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Users, Gift, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const referralStats = [
  { label: "Total Referrals", value: "12", icon: Users },
  { label: "Earnings", value: "2,500 $SEQ", icon: Gift },
  { label: "Pending", value: "500 $SEQ", icon: TrendingUp },
];

const referralHistory = [
  { address: "0x1234...abcd", date: "Feb 5, 2026", reward: "250 $SEQ" },
  { address: "0x5678...efgh", date: "Feb 4, 2026", reward: "200 $SEQ" },
  { address: "0x9abc...ijkl", date: "Feb 3, 2026", reward: "300 $SEQ" },
];

export const ReferralTab = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://sequoia.io/ref/abc123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {referralStats.map((stat, index) => (
          <div key={index} className="glass-card p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Referral Link */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Your Referral Link</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Share your referral link and earn 5% of every purchase made by your referrals.
        </p>
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="bg-muted/50 border-border/50"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            className="px-4 border-border/50"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Referral History</h3>
        <div className="space-y-3">
          {referralHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
            >
              <div>
                <p className="text-foreground font-medium">{item.address}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <span className="text-sm text-secondary font-medium">{item.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
