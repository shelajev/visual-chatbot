import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useMessages } from "../../MessageProvider";
import { McpServerDisplay } from "./McpServerDisplay";
import { AddMcpServerDialog } from "./AddMcpServerDialog";
import { useState } from "react";

export const McpCollectionDisplay = () => {
  const { mcpServers } = useMessages();
  const [showAddMcpServerDialog, setShowAddMcpServerDialog] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <p>MCP (which stands for Model Context Protocol) provides the ability to package and run several tools in external processes.</p>

            <p>MCP defines the protocol on how to communicate with these servers, including how to list tools, execute a tool, and more.</p>

            <p>Below are the MCP servers currently available for the LLM to use in this chat session.</p>
          </Col>
        </Row>

        <hr />

        { mcpServers.length === 0 && (
          <Row>
            <Col>
              <p>No MCP servers have been added yet. Click the button below to add one.</p>
            </Col>
          </Row>
        )}

        {mcpServers.map((mcpServer) => (
          <McpServerDisplay 
            key={mcpServer.id} 
            mcpServer={mcpServer}
          />
        ))}

        <Row>
          <Col>
            <Button variant="secondary" onClick={() => setShowAddMcpServerDialog(true)}>+ Add MCP Server</Button>
          </Col>
        </Row>
      </Container>

      <AddMcpServerDialog
        show={showAddMcpServerDialog}
        onClose={() => setShowAddMcpServerDialog(false)}
      />
    </>
  );
}