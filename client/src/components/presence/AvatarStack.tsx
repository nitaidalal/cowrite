import type { CollabUser } from '../../hooks/useCollabDoc';

type Props = {
  users: CollabUser[];
};

const MAX_VISIBLE = 4;

export function AvatarStack({ users }: Props) {
  const visible = users.slice(0, MAX_VISIBLE);
  const extra = users.length - MAX_VISIBLE;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((user) => (
        <div
          key={user.clientId}
          title={user.name}
          style={{ backgroundColor: user.color }}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-xs font-semibold text-cursor-foreground"
        >
          {user.name.charAt(0)}
        </div>
      ))}
      {extra > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-semibold text-muted-foreground">
          +{extra}
        </div>
      )}
    </div>
  );
}
