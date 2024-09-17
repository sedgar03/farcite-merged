import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

const MemoContent: React.FC = () => {
  const initialConfig = {
    namespace: 'MemoEditor',
    theme: {
      // Customize the editor's theme here (optional)
    },
    onError: (error: Error) => {
      console.error('Editor Error: ', error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="editor-container"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '100%', // Allow the editor to take full height
          height: '100vh',   // Set height to 100% of the viewport height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              style={{
                outline: 'none',
                flex: 1,  // Ensure the editor takes up the full available space
                minHeight: '100%',  // Take up the entire vertical space
              }}
            />
          }
          placeholder={
            <div
              className="editor-placeholder"
              style={{
                color: '#888',
                position: 'absolute', // Ensure the placeholder covers the entire editor area
                top: 10,              // Adjust the position to avoid clicking issues
                left: 10,
              }}
            >
              Start writing...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};

export default MemoContent;
