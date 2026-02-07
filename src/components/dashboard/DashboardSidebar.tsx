import { Home, Users, Gift, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

type TabType = "dashboard" | "referral" | "settings";

interface DashboardSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClaimClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "dashboard" as TabType, label: "Dashboard", icon: Home },
  { id: "referral" as TabType, label: "Referral Program", icon: Users },
];

export const DashboardSidebar = ({
  activeTab,
  onTabChange,
  onClaimClick,
  isOpen,
  onClose,
}: DashboardSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar-background border-r border-sidebar-border z-50 transform transition-transform lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6">
            <img src={logo} alt="Sequoia Protocol" className="w-8 h-8" />
            <span className="font-bold text-sidebar-foreground">Sequoia Protocol</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Claim Tokens */}
            <button
              onClick={() => {
                onClaimClick();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span className="font-medium">Claim Tokens</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => {
                onTabChange("settings");
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "settings"
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          {/* Wallet Info */}
          <div className="border-t border-sidebar-border pt-4 mt-4">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">0x1234...5678</p>
                <p className="text-xs text-sidebar-foreground/50">Connected</p>
              </div>
              <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-sidebar-foreground/50" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
