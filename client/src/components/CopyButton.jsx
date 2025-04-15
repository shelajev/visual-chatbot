import { useEffect } from "react";

export function CopyButton({ text, children, ...otherProps }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button onClick={handleCopy} className="copy-button" {...otherProps}>
      {children}
    </Button>
  );

}