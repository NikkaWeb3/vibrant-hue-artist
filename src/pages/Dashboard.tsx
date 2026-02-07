import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PurchaseWidget } from "@/components/dashboard/PurchaseWidget";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { PartnersSlider } from "@/components/dashboard/PartnersSlider";
import { ReferralTab } from "@/components/dashboard/ReferralTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";
import { ClaimModal } from "@/components/dashboard/ClaimModal";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type TabType = "dashboard" | "referral" | "settings";

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Sequoia</h1>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to access your dashboard, view your tokens, and manage your referrals.
          </p>
          <Button
            onClick={() => setIsConnected(true)}
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Connect Wallet
          </Button>
          <Link to="/" className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClaimClick={() => setShowClaimModal(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Partners Slider */}
        <PartnersSlider />

        {activeTab === "dashboard" && (
          <>
            <StatsCards />
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <PurchaseWidget />
              <Leaderboard />
            </div>
          </>
        )}

        {activeTab === "referral" && <ReferralTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>

      {/* Claim Modal */}
      <ClaimModal isOpen={showClaimModal} onClose={() => setShowClaimModal(false)} />
    </div>
  );
};

export default Dashboard;
