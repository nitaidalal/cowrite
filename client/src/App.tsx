import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { getHealth } from './api/health';
import { Editor } from './components/editor/Editor';
import { AvatarStack } from './components/presence/AvatarStack';
import { ConnectionStatus } from './components/ui/ConnectionStatus';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { useCollabDoc } from './hooks/useCollabDoc';
import { useTheme } from './hooks/useTheme';
import { getIdentity } from './lib/identity';

const DOC_NAME = 'demo-document';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [identity] = useState(getIdentity);
  const { collab, status, synced, users } = useCollabDoc(DOC_NAME);
  const wasOffline = useRef(false);

  // Check that the REST API is reachable
  useEffect(() => {
    const checkApi = async () => {
      try {
        await getHealth();
      } catch {
        toast.error('API server is not reachable', { id: 'api-down' });
      }
    };
    void checkApi();
  }, []);

  // Tell the user when the collab connection drops and comes back
  useEffect(() => {
    if (status === 'disconnected') {
      wasOffline.current = true;
      toast.error('Connection lost. Trying to reconnect...', { id: 'connection' });
    } else if (status === 'connected' && wasOffline.current) {
      wasOffline.current = false;
      toast.success('Back online', { id: 'connection' });
    }
  }, [status]);

  return (
    <div data-theme={theme} className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
          iconTheme: { primary: 'var(--primary)', secondary: 'var(--primary-foreground)' },
        }}
      />

      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <h1 className="text-lg font-semibold text-primary">Collab Editor</h1>
          <div className="flex items-center gap-4">
            <ConnectionStatus status={status} synced={synced} />
            <AvatarStack users={users} />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {collab ? (
          <Editor ydoc={collab.ydoc} provider={collab.provider} identity={identity} />
        ) : (
          <p className="text-muted-foreground">Loading editor...</p>
        )}
      </main>
    </div>
  );
}
