import Button from "react-bootstrap/Button";
import { useBackend } from "../../BackendProvider";

export const ToolDisplay = ({ tool, onClick }) => {
  const { removeTool } = useBackend();

  const onRemove = () => {
    if (confirm(`Are you sure you want to remove tool ${tool.name}?`)) {
      removeTool(tool);
    }
  }

  return (
    <div className="bg-light mb-3 d-flex" onClick={onClick}>
      <div className="flex-grow-1">
        <div><strong>{tool.name}</strong> ({ tool.type })</div>
        <div><em>{ tool.description }</em></div>
      </div>
      <div className="p-3">
        { tool.type === "local" && (
          <Button variant="light" onClick={(e) => { onRemove(); e.stopPropagation(); }}>X</Button>
        )}
      </div>
    </div>
  );
};