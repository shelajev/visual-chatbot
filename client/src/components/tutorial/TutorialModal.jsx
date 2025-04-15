import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ReactMarkdown from "react-markdown";
import { useTutorial } from "./TutorialContextProvider";
import mermaid from "remark-mermaidjs";
import callouts from "remark-callouts";
import "remark-callouts/styles.css";
import { Code } from "./markdown/Code";
import { CopyButton } from "./markdown/CopyButton";
import { useMemo } from "react";
import { useBackend } from "../../BackendProvider";

export const TutorialModal = ({ }) => {
  const { config } = useBackend();
  const { shouldShowModal, closeTutorialModal, steps, currentStep, nextStep, previousStep, setActiveStep } = useTutorial();

  const stepContent = useMemo(() => {
    return steps[currentStep - 1].content
      .replaceAll("{{MODEL}}", config.model)
      .replaceAll("{{ENDPOINT}}", config.endpoint)
      .replaceAll("docker-socket/exp/vDD4.40", "localhost:12434");
  }, [config, steps, currentStep]);

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
              <div id="tutorial-output">
                <ReactMarkdown 
                  remarkPlugins={[mermaid, callouts]}
                  components={{
                    code: Code,
                    copy: CopyButton,
                  }}
                >
                  {stepContent}
                </ReactMarkdown>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={previousStep} disabled={currentStep === 1}>Prev</Button>
        <Button variant="secondary" onClick={closeTutorialModal}>Close</Button>
        <Button variant="primary" onClick={nextStep} disabled={currentStep === steps.length}>Next</Button>
      </Modal.Footer>
    </Modal>
  )
}