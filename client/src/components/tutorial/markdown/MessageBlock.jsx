import { useBackend } from "../../../BackendProvider";
import { SyntaxHighlighterDisplay } from "./SyntaxHighlighterDisplay";
import Button from "react-bootstrap/Button";

export function MessageBlock({ children, language = "plaintext" }) {
  const { sendMessage } = useBackend();

  return (
    <div className="message-block mb-3">
      <pre>
        <SyntaxHighlighterDisplay
          language={language}
          code={children}
        />
      </pre>
      <Button
        size="sm"
        variant="primary"
        onClick={() => sendMessage(String(children).replace(/\n$/, ''))}
      >
        Add user message
      </Button>
    </div>
  );
}