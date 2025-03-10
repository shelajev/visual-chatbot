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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const TutorialModal = ({ }) => {
  const { shouldShowModal, closeTutorialModal, steps, currentStep, nextStep, previousStep } = useTutorial();

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
                  <ListGroup.Item key={index} as="li" action eventKey={index + 1}>
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
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
            
                      return !inline && match ? (
                        <SyntaxHighlighter style={ghcolors} PreTag="div" language={match[1]} {...props}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {steps[currentStep - 1].content}
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