import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const SettingsTab = () => {
  return (
    <div className="mt-6 space-y-6 max-w-2xl">
      {/* Notifications */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your purchases</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive news and announcements</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Email Address</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="mt-2 bg-muted/50 border-border/50"
            />
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-destructive/50">
        <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Disconnect your wallet from this application.
        </p>
        <Button variant="destructive">Disconnect Wallet</Button>
      </div>
    </div>
  );
};
