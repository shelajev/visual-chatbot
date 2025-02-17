import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMessages } from "../../MessageProvider";
import { useCallback, useState } from "react";

export const LlmConfigurationModal = ({ show, onClose }) => {
  const { config, updateConfiguration } = useMessages();
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(config.model);
  const [endpoint, setEndpoint] = useState(config.endpoint);

  const handleClose = useCallback(() => {
    onClose();
    setApiKey("");
  }, [onClose]);

  return (
    <Modal size="xl" show={show} backdrop={config.hasApiKey ? true : "static"} keyboard={config.hasApiKey} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>LLM Configuration</Modal.Title>
      </Modal.Header>

      <Form onSubmit={e => {
        e.preventDefault();
        updateConfiguration({ apiKey, model, endpoint });
      }}>
        <Modal.Body>          
          <Form.Group className="mb-3" controlId="endpoint">
            <Form.Label>Endpoint</Form.Label>
            <Form.Control type="text" placeholder="Endpoint" value={endpoint} onChange={e => setEndpoint(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apiKey">
            <Form.Label className={config.hasApiKey ? "" : "fw-bold"}>API Key</Form.Label>
            <Form.Control 
              required={!config.hasApiKey}
              type="text" 
              placeholder={config.hasApiKey ? "Already set. Replace if needed" : "API Key"}
              value={apiKey} 
              onChange={e => setApiKey(e.target.value)} 
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          { config.hasApiKey && <Button variant="secondary" onClick={handleClose}>Cancel</Button> }
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}