import Button from "react-bootstrap/Button";
import { useMessages } from "../../MessageProvider";

export const McpServerDisplay = ({ mcpServer }) => {
  const { removeMcpServer } = useMessages();

  const onRemove = () => {
    if (confirm(`Are you sure you want to remove MCP server ${mcpServer.name}?\n\nThis will remove all tools associated with this server.`)) {
      removeMcpServer(mcpServer);
    }
  }


  return (
    <div className="bg-light mb-3 d-flex">
      <div className="flex-grow-1">
        <div><strong>{mcpServer.name}</strong> <em><small>({mcpServer.tools.length} {mcpServer.tools.length === 1 ? "tool" : "tools"}) </small></em></div>
        Command: <code>{ mcpServer.command } { mcpServer.args.join(" ") }</code>
      </div>
      <div className="p-3">
        <Button variant="light" onClick={onRemove}>X</Button>
      </div>
    </div>
  );
};