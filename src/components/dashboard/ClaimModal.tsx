import { X, Calendar } from "lucide-react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimModal = ({ isOpen, onClose }: ClaimModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="glass-card p-6 max-w-md w-full relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-4">Claim Tokens</h2>

          <p className="text-muted-foreground mb-6">
            Your <span className="text-primary font-semibold">$SEQ</span> tokens will be available 
            on this dashboard. The listing is scheduled for{" "}
            <span className="text-foreground font-semibold">May 15, 2026</span>.
          </p>

          <div className="glass-card p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
            <p className="text-2xl font-bold gradient-text">125,000 $SEQ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
