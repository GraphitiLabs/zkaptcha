// TerminalCode.js
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const TerminalCode = ({ language, codeString }) => {
  return (
    <div className="bg-black bg-opacity-80 p-4 rounded">
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ backgroundColor: 'transparent', fontSize: '0.9rem', lineHeight: 1.5 }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default TerminalCode;
