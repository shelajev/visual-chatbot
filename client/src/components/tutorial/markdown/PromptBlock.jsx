import { useCallback } from "react";
import { useBackend } from "../../../BackendProvider";
import { SyntaxHighlighterDisplay } from "./SyntaxHighlighterDisplay";
import Button from "react-bootstrap/Button";

export function PromptBlock({ children }) {
  const { config, updateConfiguration, resetMessages } = useBackend();

  const setPrompt = useCallback((prompt) => {
    updateConfiguration({
      ...config,
      systemPrompt: prompt,
    }).then(() => resetMessages())
  }, [config]);

  return (
    <div className="message-block mb-3">
      <pre>
        <SyntaxHighlighterDisplay
          language="plaintext"
          code={children}
          showLineNumbers={false}
        />
      </pre>
      <Button
        size="sm"
        variant="primary"
        onClick={() => setPrompt(String(children).replace(/\n$/, ''))}
      >
        Set system prompt
      </Button>
    </div>
  );
}