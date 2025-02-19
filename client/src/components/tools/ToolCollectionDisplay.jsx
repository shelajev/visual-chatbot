import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useBackend } from "../../BackendProvider";
import { ToolDisplay } from "./ToolDisplay";
import { AddToolModal } from "./AddToolModal";

export const ToolCollectionDisplay = () => {
  const { tools } = useBackend();
  const [showAddToolModal, setShowAddToolModal] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <p>Tools enable an LLM to <em>do</em> something, rather than only return information it was trained on.</p>

            <p>The LLM will look at the request, look at the available tools, and then use those tools to gather more information or complete the requested work.</p>

            <p>Below are the tools currently available for the LLM to use in this chat session.</p>
          </Col>
        </Row>

        <hr />

        { tools.length === 0 && <p><em>There are currently no tools available</em></p> }


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

      <AddToolModal show={showAddToolModal} onClose={() => setShowAddToolModal(false)} />
    </>
  );
}