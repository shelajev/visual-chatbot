import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useCallback, useState } from "react";
import { useBackend } from "../../BackendProvider";

const NAME_PATTERN = "[a-zA-Z0-9_\-]+";

export const AddMcpServerDialog = ({ show, onClose }) => {
  const { addMcpServer } = useBackend();
  const [name, setName] = useState("");
  const [command, setCommand] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const commandSplit = command.split(" ");
    const commandName = commandSplit[0];
    const commandArgs = commandSplit.slice(1);

    const mcpServer = {
      name,
      command: commandName,
      args: commandArgs,
    };

    setLoading(true);

    addMcpServer(mcpServer)
      .then(() => handleClose())
      .finally(() => setLoading(false));
  };

  const handleClose = useCallback(() => {
    setName("");
    setCommand("");
    onClose();
    setValidated(false);
  }, [onClose, setName, setCommand, setValidated]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add MCP Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Create and add a MCP Server using this form.</p>

          <hr />

            <Form.Group className="mb-4" controlId="tool-name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                required 
                pattern={NAME_PATTERN}
                placeholder="Enter a name for the MCP Server" 
                value={name} 
                onChange={e => setName(e.target.value)} />
              <Form.Text className="text-muted">
                Names can only contain letters, numbers, underscores, and hyphens
              </Form.Text>
              <Form.Control.Feedback type="invalid">Names can only contain letters, numbers, underscores, and hyphens</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Command</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                required 
                placeholder="Enter the command used to launch the server"
                value={command} 
                onChange={e => setCommand(e.target.value)} 
              />
              <Form.Text className="text-muted">
                This command will be executed in order to launch the MCP server.
              </Form.Text>
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            { loading ? (
              <Spinner animation="border" size="sm" />
            ) : "Add MCP Server" }
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
};