import { PresaleCard } from "./PresaleCard";
import { Shield, TrendingUp, Zap } from "lucide-react";
import UnicornScene from "unicornstudio-react";
import { AnimatedCounter } from "./AnimatedCounter";

const features = [
  {
    icon: TrendingUp,
    title: "Options Trading",
    description: "Professional-grade platform",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Audited smart contracts",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Instant settlements",
  },
];

export const HeroSection = () => {
  return (
    <section id="presale" className="relative min-h-screen pt-24 lg:pt-32 pb-16 overflow-hidden">
      {/* Unicorn Studio WebGL Background */}
      <div className="absolute inset-0 pointer-events-none">
        <UnicornScene 
          projectId="MAbUNFByHvoc8Rg1gAYe"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%" 
          height="100%" 
          scale={0.75}
          lazyLoad={true}
        />
        {/* Fallback gradient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm text-primary font-medium">Phase 1 Presale Live</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Trade Options</span>
              <br />
              <span className="gradient-text">Like a Pro</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-8">
              Sequoia Protocol is building the next generation options trading platform. 
              Decentralized, transparent, and accessible to everyone.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-muted/30 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={2} prefix="$" suffix="M+" duration={1500} />
                </p>
                <p className="text-sm text-muted-foreground">Target TVL</p>
              </div>
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={10} suffix="K+" duration={1500} />
                </p>
                <p className="text-sm text-muted-foreground">Early Supporters</p>
              </div>
              <div className="group">
                <p className="text-3xl lg:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={50} suffix="x" duration={1500} />
                </p>
                <p className="text-sm text-muted-foreground">Potential ROI</p>
              </div>
            </div>
          </div>

          {/* Right Side - Presale Card */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <PresaleCard />
          </div>
        </div>
      </div>

      {/* Partner Logos Ticker */}
      <div className="mt-16 lg:mt-24 w-full overflow-hidden">
        <div className="border-t border-b border-border/30 py-6">
          <div className="flex w-max animate-marquee gap-16">
            {["CertiK", "Chainlink", "CoinGecko", "CoinMarketCap", "DeFiLlama", "Uniswap", "PancakeSwap", "Raydium", "CertiK", "Chainlink", "CoinGecko", "CoinMarketCap", "DeFiLlama", "Uniswap", "PancakeSwap", "Raydium"].map((partner, i) => (
              <span key={i} className="text-muted-foreground/50 text-xl font-semibold whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
