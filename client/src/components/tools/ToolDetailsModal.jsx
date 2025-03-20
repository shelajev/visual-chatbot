import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export const ToolDetailsModal = ({ show, onClose, tools, selectedTool }) => {

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Tool details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey={selectedTool?.name}>
          { tools.map((tool, index) => (
            <Accordion.Item key={tool.name} eventKey={tool.name}>
              <Accordion.Header>{ tool.name }</Accordion.Header>
              <Accordion.Body>
                <pre>
                  { 
                    JSON.stringify({
                      name: tool.name,
                      description: tool.description,
                      parameters: tool.parameters,
                    }, null, 2)}
                </pre>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};