import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import { useBackend } from "../../BackendProvider";
import ReactMarkdown from "react-markdown";
import mermaid from "remark-mermaidjs";
import { useMemo, useState } from "react";

export const ToolGraphDisplay = () => {
  const { tools, mcpServers } = useBackend();
  const [showMermaidDialog, setShowMermaidDialog] = useState(false);

  const toolMermaidCode = useMemo(() => {
    const items = [];
    items.push("flowchart LR");
    items.push("  app[App]");

    tools.forEach((tool) => items.push(`  ${tool.name}["${tool.name}"]`));
    mcpServers.forEach((mcpServer) => {
      items.push(`  subgraph "MCP Server - ${mcpServer.name}"`);
      items.push(`  ${mcpServer.name}["${mcpServer.name}"]`)
      mcpServer.tools.forEach((tool) => {
        items.push(`  ${mcpServer.name} --> ${tool.name}`);
      });
      items.push(`  end`);

      items.push(`  app --> ${mcpServer.name}`);
    });

    tools.filter(t => t.type === "local").forEach((tool) => {
      items.push(`  app --> ${tool.name}`);
    });

    return items.join("\n");
  }, [tools, mcpServers]);
  
  const wrappedCode = "```mermaid\n" + toolMermaidCode + "\n```";

  return (
    <>
      <Nav.Link variant="secondary" onClick={() => setShowMermaidDialog(true)}>
        Tool graph
      </Nav.Link>
      <Modal show={showMermaidDialog} onHide={() => setShowMermaidDialog(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Visualize tools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown
            remarkPlugins={[mermaid]}
            children={wrappedCode}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMermaidDialog(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}