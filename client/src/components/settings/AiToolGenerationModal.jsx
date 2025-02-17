import { useMessages } from '../../MessageProvider';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const AiToolGenerationModal = ({ show, onClose }) => {
  const { toggleAiToolGeneration, isAiToolGenerationEnabled } = useMessages();

  return (
    <Modal size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>AI tool generation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>When checked, a tool is added that allows the AI to create new tools on its own.</p>
        <p>When unchecked, only the tools you specify will be allowed.</p>

        <p>As an example, if you ask for the current time and there is no tool to provide the current time, the LLM may invoke the <code>tool-creator</code> tool to create a tool that can provide the missing data.</p>

        <hr />

        <Form.Check
          type="switch"
          id="ai-tool-generation-toggle"
          label="Enable AI tool generation"
          checked={isAiToolGenerationEnabled}
          onChange={toggleAiToolGeneration}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};