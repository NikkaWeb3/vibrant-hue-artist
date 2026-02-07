import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.svg";

const navItems = [
  { label: "Pre-sale", href: "#presale", isAnchor: true },
  { label: "How to Buy", href: "/how-to-buy", isAnchor: false },
  { label: "About", href: "#about", isAnchor: true },
  { label: "Tokenomics", href: "#tokenomics", isAnchor: true },
  { label: "Docs", href: "https://gitbook.io", isExternal: true },
  { label: "Blog", href: "/blog", isAnchor: false },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      window.open(item.href, "_blank");
    } else if (item.isAnchor) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.href);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between h-14 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Sequoia Protocol" className="w-8 h-8" />
            <span className="font-bold text-foreground hidden sm:block">Sequoia Protocol</span>
          </Link>

          {/* Desktop Nav - Centered Pill */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/70 px-4 py-1.5 rounded-full transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>

            {/* Launch App Button */}
            <Link to="/dashboard">
              <Button className="bg-primary/20 text-primary border border-primary/30 font-semibold px-5 h-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                Launch App
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-muted/50 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-6xl">
          <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
            <nav className="p-2 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-left py-3 px-4 text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
