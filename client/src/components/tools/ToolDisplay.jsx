import Button from "react-bootstrap/Button";
import { useBackend } from "../../BackendProvider";

export const ToolDisplay = ({ tool, onClick }) => {
  const { removeTool, setToolEnabled } = useBackend();

  const onRemove = () => {
    if (confirm(`Are you sure you want to remove tool ${tool.name}?`)) {
      removeTool(tool);
    }
  }

  return (
    <div className="bg-light mb-3 d-flex">
      <div className="p-3">
        <input
          type="checkbox"
          checked={tool.enabled}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setToolEnabled(tool, e.target.checked);
          }}
          className="form-check-input"
        />
      </div>
      <div className="flex-grow-1" onClick={onClick}>
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