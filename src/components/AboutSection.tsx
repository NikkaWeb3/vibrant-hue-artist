import { Check, Target, Users, Rocket } from "lucide-react";

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

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-primary font-medium">About Sequoia</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Building the Future of<br />
            <span className="gradient-text">Options Trading</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sequoia Protocol is revolutionizing how traders interact with options markets 
            through blockchain technology, making professional trading accessible to everyone.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left - Features */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Why Sequoia?</h3>
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

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 text-center">
              <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">1B</p>
              <p className="text-sm text-muted-foreground">Total Supply</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">40%</p>
              <p className="text-sm text-muted-foreground">Public Sale</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">3</p>
              <p className="text-sm text-muted-foreground">Blockchains</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">Q2</p>
              <p className="text-sm text-muted-foreground">2026 Launch</p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="grid md:grid-cols-3 gap-6">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`glass-card p-6 relative ${
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
          ))}
        </div>
      </div>
    </section>
  );
};
