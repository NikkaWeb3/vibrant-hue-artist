import { useTransactions, type Transaction } from '@/hooks/useTransactions';
import { Loader2, ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mainnet, bsc } from 'wagmi/chains';

const getChainName = (chainId: number) => {
  if (chainId === mainnet.id) return 'Ethereum';
  if (chainId === bsc.id) return 'BNB Chain';
  return 'Unknown';
};

const getChainExplorer = (chainId: number, txHash: string) => {
  if (chainId === mainnet.id) return `https://etherscan.io/tx/${txHash}`;
  if (chainId === bsc.id) return `https://bscscan.com/tx/${txHash}`;
  return '#';
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-primary" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-secondary" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const TransactionRow = ({ tx }: { tx: Transaction }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-3">
        {getStatusIcon(tx.status)}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {Number(tx.tokens_received).toLocaleString()} $SEQ
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {getChainName(tx.chain_id)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {Number(tx.amount_paid).toFixed(6)} {tx.payment_method.toUpperCase()} • {formatDate(tx.created_at)}
          </p>
        </div>
      </div>
      {tx.tx_hash && (
        <a
          href={getChainExplorer(tx.chain_id, tx.tx_hash)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};

export const TransactionHistory = () => {
  const { transactions, isLoading, error } = useTransactions();

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {!isLoading && !error && transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No transactions yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your purchase history will appear here
          </p>
        </div>
      )}

      {!isLoading && !error && transactions.length > 0 && (
        <div className="divide-y divide-border/50">
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
};
