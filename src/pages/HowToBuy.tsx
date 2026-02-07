import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Wallet, CreditCard, ArrowRightLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Wallet,
    title: "Create a Wallet",
    description: "Download MetaMask or Trust Wallet and create a new wallet. Make sure to save your seed phrase securely.",
  },
  {
    icon: CreditCard,
    title: "Get ETH/BNB/SOL",
    description: "Purchase cryptocurrency from an exchange like Coinbase or Binance and transfer it to your wallet.",
  },
  {
    icon: ArrowRightLeft,
    title: "Connect & Swap",
    description: "Connect your wallet to our presale page and enter the amount of tokens you want to purchase.",
  },
  {
    icon: CheckCircle,
    title: "Claim Tokens",
    description: "After the presale ends, return to our dashboard to claim your $SEQ tokens.",
  },
];

const HowToBuy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              How to Buy <span className="gradient-text">$SEQ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to participate in the Sequoia Protocol presale.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="glass-card p-8 mb-16 text-center">
            <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Video Guide Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="glass-card p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                </div>
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowToBuy;
