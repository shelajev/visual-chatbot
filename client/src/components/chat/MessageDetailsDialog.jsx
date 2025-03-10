import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

export const MessageDetailsDialog = ({ selectedMessageIndex, messages, onClose, onDeleteMessage }) => {
  return (
    <Modal show={selectedMessageIndex !== null} size="lg" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey={selectedMessageIndex}>
          { messages.map((message, index) => (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>Message { index + 1} - { message.role }</Accordion.Header>
              <Accordion.Body>
                <pre>{ JSON.stringify(message, null, 2) }</pre>

                { message.type !== "system" && (
                  <Button variant="danger" onClick={() => onDeleteMessage(message)}>Delete</Button>
                )}
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
}