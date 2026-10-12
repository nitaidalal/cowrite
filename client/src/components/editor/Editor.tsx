import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCaret from '@tiptap/extension-collaboration-caret';
import type { HocuspocusProvider } from '@hocuspocus/provider';
import type * as Y from 'yjs';
import type { Identity } from '../../lib/identity';
import { Toolbar } from './Toolbar';

type Props = {
  ydoc: Y.Doc;
  provider: HocuspocusProvider;
  identity: Identity;
};

// Builds the DOM element ProseMirror places at a remote user's cursor position.
function renderCaret(user: Record<string, string>): HTMLElement {
  const caret = document.createElement('span');
  caret.classList.add('collaboration-carets__caret');
  caret.style.setProperty('--caret-color', user.color);

  const label = document.createElement('div');
  label.classList.add('collaboration-carets__label');
  label.textContent = user.name;

  caret.appendChild(label);
  return caret;
}

// Attributes for the highlighted text a remote user has selected.
function renderSelection(user: Record<string, string>) {
  return {
    nodeName: 'span',
    class: 'collaboration-carets__selection',
    style: `--caret-color: ${user.color}`,
  };
}

export function Editor({ ydoc, provider, identity }: Props) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          undoRedo: false,
          dropcursor: { color: 'var(--primary)' },
        }),
        Collaboration.configure({ document: ydoc }),
        CollaborationCaret.configure({
          provider,
          user: identity,
          render: renderCaret,
          selectionRender: renderSelection,
        }),
      ],
    },
    [ydoc, provider],
  );

  return (
    <div className="space-y-3">
      <Toolbar editor={editor} />
      <div className="editor-content rounded-lg border border-border bg-card px-6 py-5 text-card-foreground">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
