import { Check, Target, Users, Rocket } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { PresaleCard } from "./PresaleCard";
import { useRef, useState, useEffect } from "react";

const highlights = [
  "Decentralized options trading protocol",
  "Professional-grade trading tools",
  "Audited and secure smart contracts",
  "Cross-chain compatibility",
  "Community-driven governance",
  "Transparent fee structure",
];

const roadmapItems = [
  {
    icon: Target,
    phase: "Phase 1",
    title: "Foundation",
    description: "Token presale, community building, core team expansion",
    status: "active",
  },
  {
    icon: Users,
    phase: "Phase 2",
    title: "Development",
    description: "Platform development, security audits, testnet launch",
    status: "upcoming",
  },
  {
    icon: Rocket,
    phase: "Phase 3",
    title: "Launch",
    description: "Mainnet launch, CEX listings, marketing campaign",
    status: "upcoming",
  },
];

const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Two-column: Features left, Presale Card right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left - Heading + Features */}
          <AnimatedCard>
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                Building the Future of<br />
                <span className="gradient-text">Options Trading</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Sequoia Protocol is revolutionizing how traders interact with options markets 
                through blockchain technology, making professional trading accessible to everyone.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Right - Presale Card */}
          <AnimatedCard delay={200}>
            <div className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <PresaleCard />
            </div>
          </AnimatedCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <AnimatedCard delay={0}>
            <div className="glass-card p-6 text-center group hover:border-primary/50 transition-colors">
              <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter end={1} suffix="B" />
              </p>
              <p className="text-sm text-muted-foreground">Total Supply</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={100}>
            <div className="glass-card p-6 text-center group hover:border-primary/50 transition-colors">
              <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter end={40} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">Public Sale</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <div className="glass-card p-6 text-center group hover:border-primary/50 transition-colors">
              <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter end={3} />
              </p>
              <p className="text-sm text-muted-foreground">Blockchains</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={300}>
            <div className="glass-card p-6 text-center group hover:border-primary/50 transition-colors">
              <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">Q2</p>
              <p className="text-sm text-muted-foreground">2026 Launch</p>
            </div>
          </AnimatedCard>
        </div>

        {/* Roadmap */}
        <div className="grid md:grid-cols-3 gap-6">
          {roadmapItems.map((item, index) => (
            <AnimatedCard key={index} delay={index * 150}>
              <div
                className={`glass-card p-6 relative h-full hover:border-primary/50 transition-all hover:-translate-y-1 ${
                  item.status === "active" ? "border-primary/50" : ""
                }`}
              >
                {item.status === "active" && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-primary font-medium mb-1">{item.phase}</p>
                <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
