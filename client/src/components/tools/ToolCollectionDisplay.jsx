import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useMessages } from "../../MessageProvider";
import { ToolDisplay } from "./ToolDisplay";
import { AddToolModal } from "./AddToolModal";

export const ToolCollectionDisplay = () => {
  const { tools, toggleAiToolGeneration, isAiToolGenerationEnabled } = useMessages();
  const [showAddToolModal, setShowAddToolModal] = useState(false);

  return (
    <>
      <Container fluid>
        <h2>Tools</h2>

        { tools.length === 0 && <p>No tools available</p> }
        { tools.length > 0 && (
          <p><em>Below are tools available for use by the LLM</em></p>
        )}


        {tools.map((tool) => (
          <ToolDisplay key={tool.name} tool={tool} />
        ))}

        <Button 
          variant="secondary"
          onClick={() => setShowAddToolModal(true)}
        >
          + Add tool
        </Button>
      </Container>

      
      <input id="ai-tool-generation-toggle" type="checkbox" checked={isAiToolGenerationEnabled} onChange={toggleAiToolGeneration} />
      &nbsp; <label htmlFor="ai-tool-generation-toggle">Enable AI tool generation</label>

      <AddToolModal show={showAddToolModal} onClose={() => setShowAddToolModal(false)} />
    </>
  );
}