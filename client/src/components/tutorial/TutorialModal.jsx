import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useTutorial } from "./TutorialContextProvider";
import { TutorialDisplay } from "./TutorialDisplay";
import { TutorialActions } from "./TutorialActions";

export const TutorialModal = ({ }) => {
  const { shouldShowModal, closeTutorialModal, steps, currentStep, nextStep, previousStep, setActiveStep } = useTutorial();

  return (
    <Modal size="xl" show={shouldShowModal} onHide={closeTutorialModal}>
      <Modal.Header>
        <Modal.Title>Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col sm={3}>
              <ListGroup activeKey={currentStep} as="ol" numbered className="flex-column">
                {steps.map((step, index) => (
                  <ListGroup.Item key={index} as="li" action eventKey={index + 1} onClick={() => setActiveStep(index + 1)}>
                    {step.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={9}>
              <TutorialDisplay />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <TutorialActions onClose={closeTutorialModal} />
      </Modal.Footer>
    </Modal>
  )
}