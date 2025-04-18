import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function SyntaxHighlighterDisplay({ language, highlightRows = [], showLineNumbers = true, code }) {
  return (
    <SyntaxHighlighter 
      style={ghcolors} 
      PreTag="div" 
      language={language} 
      wrapLines={true}
      showLineNumbers={showLineNumbers}
      lineProps={(lineNumber) => {
        const style = { display: "block", width: "fit-content" };
        if (highlightRows.includes(lineNumber)) {
          style.backgroundColor = "#FFE6A8";
        }
        return { style };
      }}
    >
      {String(code).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}