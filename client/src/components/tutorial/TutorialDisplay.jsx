import "remark-callouts/styles.css";
import ReactMarkdown from "react-markdown";
import mermaid from "remark-mermaidjs";
import callouts from "remark-callouts";
import { Code } from "./markdown/Code";
import { CopyButton } from "./markdown/CopyButton";
import { useMemo } from "react";
import { useBackend } from "../../BackendProvider";
import { useTutorial } from "./TutorialContextProvider";
import { remarkCustomBlock } from "./markdown/RemarkCustomBlock";
import { MessageBlock } from "./markdown/MessageBlock";
import { PromptBlock } from "./markdown/PromptBlock";

export function TutorialDisplay() {
  const { config } = useBackend();
  const { steps, currentStep } = useTutorial();
  
  const stepContent = useMemo(() => {
    return steps[currentStep - 1].content
      .replaceAll("{{MODEL}}", config.model)
      .replaceAll("{{ENDPOINT}}", config.endpoint)
      .replaceAll("docker-socket/exp/vDD4.40", "localhost:12434");
  }, [config, steps, currentStep]);

  return (
    <div id="tutorial-output">
      <ReactMarkdown 
        remarkPlugins={[mermaid, callouts, remarkCustomBlock]}
        components={{
          code: Code,
          message: MessageBlock,
          prompt: PromptBlock,
        }}
      >
        {stepContent}
      </ReactMarkdown>
    </div>
  );
}