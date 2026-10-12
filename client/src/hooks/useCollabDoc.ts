import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import type { StatesArray } from '@hocuspocus/provider';

export type CollabUser = {
  clientId: number;
  name: string;
  color: string;
};

type Collab = {
  ydoc: Y.Doc;
  provider: HocuspocusProvider;
};

function toUsers(states: StatesArray): CollabUser[] { 
  return states
    .filter((state) => state.user)
    .map((state) => ({
      clientId: state.clientId,
      name: state.user.name,
      color: state.user.color,
    }));
}

export function useCollabDoc(docName: string) {
  const [collab, setCollab] = useState<Collab | null>(null);
  const [status, setStatus] = useState('connecting');
  const [synced, setSynced] = useState(false);
  const [users, setUsers] = useState<CollabUser[]>([]);

  useEffect(() => {
    const ydoc = new Y.Doc();

    const provider = new HocuspocusProvider({
      url: import.meta.env.VITE_COLLAB_URL,
      name: docName,
      document: ydoc,
      onStatus: ({ status }) => setStatus(status),
      onSynced: ({ state }) => setSynced(state),
      onAwarenessChange: ({ states }) => setUsers(toUsers(states)),
    });

    setCollab({ ydoc, provider });

    return () => {
      provider.destroy();
      ydoc.destroy();
      setCollab(null);
      setUsers([]);
      setSynced(false);
    };
  }, [docName]);

  return { collab, status, synced, users };
}
