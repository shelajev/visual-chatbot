export const ToolDisplay = ({ tool }) => {
  return (
    <div className="bg-light mb-3">
      <div><strong>{tool.name}</strong> ({ tool.type })</div>
      <div><em>{ tool.description }</em></div>
    </div>
  );
};