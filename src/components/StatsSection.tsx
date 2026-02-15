import { AnimatedCounter } from "./AnimatedCounter";

export const StatsSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-muted/30 border-y border-border/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
          <div className="text-center group">
            <p className="text-3xl lg:text-5xl font-bold text-foreground group-hover:scale-110 transition-transform">
              <AnimatedCounter end={2} prefix="$" suffix="M+" duration={1500} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Target TVL</p>
          </div>
          <div className="text-center group">
            <p className="text-3xl lg:text-5xl font-bold text-foreground group-hover:scale-110 transition-transform">
              <AnimatedCounter end={10} suffix="K+" duration={1500} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Early Supporters</p>
          </div>
          <div className="text-center group">
            <p className="text-3xl lg:text-5xl font-bold text-foreground group-hover:scale-110 transition-transform">
              <AnimatedCounter end={50} suffix="x" duration={1500} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Potential ROI</p>
          </div>
        </div>
      </div>
    </section>
  );
};
