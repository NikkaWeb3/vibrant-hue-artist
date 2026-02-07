import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const tokenomicsData = [
  { name: "Public Sale", value: 40, color: "hsl(80, 45%, 60%)" },
  { name: "Ecosystem", value: 20, color: "hsl(85, 55%, 50%)" },
  { name: "Team", value: 15, color: "hsl(150, 20%, 40%)" },
  { name: "Marketing", value: 10, color: "hsl(80, 45%, 45%)" },
  { name: "Liquidity", value: 10, color: "hsl(150, 15%, 30%)" },
  { name: "Advisors", value: 5, color: "hsl(85, 40%, 35%)" },
];

const vestingSchedule = [
  { allocation: "Public Sale", tge: "25%", vesting: "6 months linear" },
  { allocation: "Ecosystem", tge: "0%", vesting: "24 months linear" },
  { allocation: "Team", tge: "0%", vesting: "12 months cliff, 24 months linear" },
  { allocation: "Marketing", tge: "10%", vesting: "12 months linear" },
  { allocation: "Liquidity", tge: "100%", vesting: "Unlocked at TGE" },
  { allocation: "Advisors", tge: "0%", vesting: "6 months cliff, 18 months linear" },
];

export const TokenomicsSection = () => {
  return (
    <section id="tokenomics" className="py-20 lg:py-32 relative bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-primary font-medium">$SEQ Token</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tokenomics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fair distribution designed for long-term sustainability and community growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div className="glass-card p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenomicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tokenomicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(150, 15%, 8%)",
                      border: "1px solid hsl(150, 10%, 20%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Allocation"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {tokenomicsData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vesting Table */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Vesting Schedule</h3>
            <div className="space-y-4">
              {vestingSchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border/50 last:border-0"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-foreground">{item.allocation}</p>
                    <p className="text-sm text-muted-foreground">{item.vesting}</p>
                  </div>
                  <div className="bg-primary/20 px-3 py-1 rounded-full">
                    <span className="text-sm text-primary font-medium">TGE: {item.tge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Token Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Token Name</p>
            <p className="text-xl font-bold text-foreground">Sequoia Protocol</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Symbol</p>
            <p className="text-xl font-bold gradient-text">$SEQ</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
            <p className="text-xl font-bold text-foreground">1,000,000,000</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Networks</p>
            <p className="text-xl font-bold text-foreground">ETH, BNB, SOL</p>
          </div>
        </div>
      </div>
    </section>
  );
};
