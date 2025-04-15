import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from './CopyButton';

function expandRange(rangeString) {
  const [start, end] = rangeString.split('-').map(Number);
  if (isNaN(start) || isNaN(end) || start > end) {
    return "Invalid range";
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getHighlightRows(meta) {
  console.log("META", meta);
  const highlightRows = meta.find(m => m.startsWith("highlight="));
  if (!highlightRows) return [];

  return highlightRows.split("=")[1].split(",")
    .map(entry => entry.trim())
    .map(entry => entry.includes("-") ? expandRange(entry) : entry)
    .flat()
    .map(Number);
}

export function Code({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');

  const metadata = node.data?.meta.split(" ") || [];
  const highlightRows = getHighlightRows(metadata);

  console.log("Highlight rows", highlightRows);

  const codeDisplay = (!inline && match) ? (
    <SyntaxHighlighter 
      style={ghcolors} 
      PreTag="div" 
      language={match[1]} 
      wrapLines={true}
      showLineNumbers={true}
      lineProps={(lineNumber) => {
        const style = { display: "block", width: "fit-content" };
        if (highlightRows.includes(lineNumber)) {
          style.backgroundColor = "#FFE6A8";
        }
        return { style };
      }}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );

  if (metadata.includes("with-copy")) {
    return (
      <>
        {codeDisplay}
        <CopyButton copyText={String(children).replace(/\n$/, '')}>
          Copy
        </CopyButton>
      </>
    );
  }

  return codeDisplay;
}