import React, { useCallback, useRef } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

interface MemoContentProps {
  content: string;
  onContentChange: (content: string) => void;
  onAIRequest: (userInput: string) => Promise<any>;
}

const MemoContent: React.FC<MemoContentProps> = ({ content, onContentChange, onAIRequest }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (editor) {
        const { state } = editor;
        const { from, to } = state.selection;
        const selectedText = state.doc.textBetween(from, to, ' ');

        // Show custom context menu
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setIsContextMenuOpen(true);
        setSelectedText(selectedText);
      }
    },
    [editor]
  );

  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = React.useState('');

  const handleExpandUsingContext = () => {
    if (editor) {
      const { state } = editor;
      const { from, to } = state.selection;
      const expandedText = selectedText.split('').join('-');
      editor.chain().focus().insertContentAt({ from, to }, expandedText).run();
    }
    setIsContextMenuOpen(false);
  };

  const handlePolish = () => {
    if (editor) {
      const { state } = editor;
      const { from, to } = state.selection;
      editor.chain().focus().insertContentAt({ from, to }, 'Fancy mumbo jumbo').run();
    }
    setIsContextMenuOpen(false);
  };

  const handleReplaceText = () => {
    if (editor) {
      const { state } = editor;
      const { from, to } = state.selection;
      editor.chain().focus().insertContentAt({ from, to }, 'COOL STUFF DUDE').run();
    }
    setIsContextMenuOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto" onContextMenu={handleContextMenu}>
      <EditorContent editor={editor} className="prose max-w-none" />
      <DropdownMenu open={isContextMenuOpen} onOpenChange={setIsContextMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div
            style={{
              position: 'fixed',
              left: contextMenuPosition.x,
              top: contextMenuPosition.y,
              visibility: isContextMenuOpen ? 'visible' : 'hidden',
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onSelect={() => editor?.chain().focus().toggleBold().run()}>
            Bold
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor?.chain().focus().toggleItalic().run()}>
            Italic
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => editor?.chain().focus().toggleStrike().run()}>
            Strike
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleExpandUsingContext}>
            Expand using context
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handlePolish}>
            Polish
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleReplaceText}>
            Replace text
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemoContent;