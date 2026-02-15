import { Wallet } from "lucide-react";
import UnicornScene from "unicornstudio-react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export const HeroSection = () => {
  return (
    <section id="presale" className="relative min-h-[80vh] pt-24 lg:pt-32 pb-16 overflow-hidden flex flex-col">
      {/* Unicorn Studio WebGL Background */}
      <div className="absolute inset-0 pointer-events-none">
        <UnicornScene 
          projectId="oe37rIMIrFolZKwZfARe"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%" 
          height="100%" 
          scale={0.75}
          lazyLoad={true}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col items-center justify-center text-center">
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
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10">
          Sequoia Protocol is building the next generation options trading platform. 
          Decentralized, transparent, and accessible to everyone.
        </p>

        {/* Connect Wallet Button */}
        <div className="w-full max-w-xs">
          <ConnectWalletButton variant="presale" />
        </div>
      </div>

      {/* Marquee Ticker - Sequoia Protocol repeating */}
      <div className="mt-16 lg:mt-24 w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`text-2xl lg:text-3xl font-bold whitespace-nowrap ${
                i % 3 === 0
                  ? "text-foreground/60"
                  : i % 3 === 1
                  ? "text-primary/40"
                  : "text-foreground/20"
              }`}
            >
              Sequoia Protocol
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
