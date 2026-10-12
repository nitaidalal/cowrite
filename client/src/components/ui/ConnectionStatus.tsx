type Props = {
  status: string;
  synced: boolean;
};

const STATES = {
  synced: { label: 'Synced', dot: 'bg-success' },
  syncing: { label: 'Syncing...', dot: 'bg-warning' },
  connecting: { label: 'Connecting...', dot: 'bg-warning' },
  offline: { label: 'Offline', dot: 'bg-danger' },
} as const;

function resolveState(status: string, synced: boolean): keyof typeof STATES {
  if (status === 'connected') return synced ? 'synced' : 'syncing';
  if (status === 'connecting') return 'connecting';
  return 'offline';
}

export function ConnectionStatus({ status, synced }: Props) {
  const { label, dot } = STATES[resolveState(status, synced)];

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
