const topHolders = [
  { rank: 1, address: "0x1234...abcd", amount: "2,500,000" },
  { rank: 2, address: "0x5678...efgh", amount: "1,800,000" },
  { rank: 3, address: "0x9abc...ijkl", amount: "1,200,000" },
  { rank: 4, address: "0xdef0...mnop", amount: "950,000" },
  { rank: 5, address: "0x1357...qrst", amount: "750,000" },
];

export const Leaderboard = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Top Holders</h3>
      <div className="space-y-3">
        {topHolders.map((holder) => (
          <div
            key={holder.rank}
            className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  holder.rank <= 3
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {holder.rank}
              </div>
              <span className="text-foreground font-medium">{holder.address}</span>
            </div>
            <span className="text-sm text-muted-foreground">{holder.amount} $SEQ</span>
          </div>
        ))}
      </div>
    </div>
  );
};
