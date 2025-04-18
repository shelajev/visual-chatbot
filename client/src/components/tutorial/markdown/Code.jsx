import { CopyButton } from './CopyButton';
import { SyntaxHighlighterDisplay } from './SyntaxHighlighterDisplay';

function expandRange(rangeString) {
  const [start, end] = rangeString.split('-').map(Number);
  if (isNaN(start) || isNaN(end) || start > end) {
    return "Invalid range";
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getHighlightRows(meta) {
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

  const codeDisplay = (!inline && match) ? (
    <SyntaxHighlighterDisplay
      language={match[1]}
      highlightRows={highlightRows}
      code={children}
    />
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