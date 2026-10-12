import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import '@tiptap/extension-blockquote';
import '@tiptap/extension-bold';
import '@tiptap/extension-code';
import '@tiptap/extension-code-block';
import '@tiptap/extension-collaboration';
import '@tiptap/extension-heading';
import '@tiptap/extension-italic';
import '@tiptap/extension-list';
import '@tiptap/extension-strike';

import {
  Bold,
  Braces,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ToolButtonProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
};

function ToolButton({ label, icon: Icon, active = false, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
      }`}
    >
      <Icon size={16} />
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" />;
}

export function Toolbar({ editor }: { editor: Editor }) {
  const active = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor.isActive('bold'),
      italic: ctx.editor.isActive('italic'),
      strike: ctx.editor.isActive('strike'),
      code: ctx.editor.isActive('code'),
      h1: ctx.editor.isActive('heading', { level: 1 }),
      h2: ctx.editor.isActive('heading', { level: 2 }),
      bulletList: ctx.editor.isActive('bulletList'),
      orderedList: ctx.editor.isActive('orderedList'),
      blockquote: ctx.editor.isActive('blockquote'),
      codeBlock: ctx.editor.isActive('codeBlock'),
    }),
  });

  const run = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1.5">
      <ToolButton
        label="Bold"
        icon={Bold}
        active={active.bold}
        onClick={() => run().toggleBold().run()}
      />
      <ToolButton
        label="Italic"
        icon={Italic}
        active={active.italic}
        onClick={() => run().toggleItalic().run()}
      />
      <ToolButton
        label="Strikethrough"
        icon={Strikethrough}
        active={active.strike}
        onClick={() => run().toggleStrike().run()}
      />
      <ToolButton
        label="Inline code"
        icon={Code}
        active={active.code}
        onClick={() => run().toggleCode().run()}
      />
      <Divider />
      <ToolButton
        label="Heading 1"
        icon={Heading1}
        active={active.h1}
        onClick={() => run().toggleHeading({ level: 1 }).run()}
      />
      <ToolButton
        label="Heading 2"
        icon={Heading2}
        active={active.h2}
        onClick={() => run().toggleHeading({ level: 2 }).run()}
      />
      <Divider />
      <ToolButton
        label="Bullet list"
        icon={List}
        active={active.bulletList}
        onClick={() => run().toggleBulletList().run()}
      />
      <ToolButton
        label="Numbered list"
        icon={ListOrdered}
        active={active.orderedList}
        onClick={() => run().toggleOrderedList().run()}
      />
      <ToolButton
        label="Quote"
        icon={Quote}
        active={active.blockquote}
        onClick={() => run().toggleBlockquote().run()}
      />
      <ToolButton
        label="Code block"
        icon={Braces}
        active={active.codeBlock}
        onClick={() => run().toggleCodeBlock().run()}
      />
      <Divider />
      <ToolButton label="Undo" icon={Undo2} onClick={() => run().undo().run()} />
      <ToolButton label="Redo" icon={Redo2} onClick={() => run().redo().run()} />
    </div>
  );
}
