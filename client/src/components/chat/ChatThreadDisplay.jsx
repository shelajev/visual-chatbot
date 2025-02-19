import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import { useBackend } from "../../BackendProvider";
import { MessageDisplay } from "./MessageDisplay";
import { useCallback, useState } from "react";

export const ChatThreadDisplay = () => {
  const { messages } = useBackend();
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  const handleSelectMessage = useCallback((message) => {
    setSelectedMessageIndex(message);
  }, [setSelectedMessageIndex]);

  return (
    <>
      <Container fluid>
        {messages.map((message, index) => (
          <MessageDisplay 
            key={index} 
            message={message} 
            onSelect={() => handleSelectMessage(index)}
          />
        ))}
      </Container>

      <Modal show={selectedMessageIndex !== null} size="lg" onHide={() => setSelectedMessageIndex(null)}>
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
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedMessageIndex(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}