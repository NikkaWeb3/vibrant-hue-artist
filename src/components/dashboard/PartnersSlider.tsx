const partners = [
  "CertiK",
  "Chainlink",
  "CoinGecko",
  "CoinMarketCap",
  "DeFiLlama",
  "Uniswap",
  "PancakeSwap",
  "Raydium",
];

export const PartnersSlider = () => {
  return (
    <div className="glass-card p-4 overflow-hidden">
      <div className="flex animate-marquee gap-12">
        {[...partners, ...partners].map((partner, i) => (
          <span
            key={i}
            className="text-muted-foreground/60 text-lg font-semibold whitespace-nowrap"
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
};
