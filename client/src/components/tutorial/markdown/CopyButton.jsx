import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useBackend } from "../../../BackendProvider";

export function CopyButton({ copyText, children }) {
  const { config } = useBackend();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(() => {
    const processedText = copyText.replaceAll("{{MODEL}}", config.model);

    navigator.clipboard.writeText(processedText)
      .then(() => {
        setCopied(true);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }, [copyText, config]);

  return (
    <div className="mb-3">
      <Button onClick={handleCopy} variant="secondary">
        { copied ? "Copied!" : children }
      </Button> 
    </div>
  );
}