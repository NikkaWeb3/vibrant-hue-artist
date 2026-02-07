import { TrendingUp, Coins, Users } from "lucide-react";

const stats = [
  {
    title: "$SEQ Balance",
    value: "125,000",
    change: "+12.5%",
    icon: Coins,
    color: "text-primary",
  },
  {
    title: "Estimated Value",
    value: "$10.00",
    change: "+15.3%",
    icon: TrendingUp,
    color: "text-secondary",
  },
  {
    title: "Referral Earnings",
    value: "2,500 $SEQ",
    change: "+5 referrals",
    icon: Users,
    color: "text-primary",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-xs text-secondary font-medium">{stat.change}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
