import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCallback, useState } from "react";
import { ToolParameterInput } from "./ToolParameterInput";
import { useBackend } from "../../BackendProvider";

const NAME_PATTERN = "[a-zA-Z0-9_\-]+";
const NAME_REGEX = new RegExp("/" + NAME_PATTERN + "/");

export const AddToolModal = ({ show, onClose }) => {
  const { addTool } = useBackend();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parameters, setParameters] = useState([]);
  const [code, setCode] = useState("");
  const [validated, setValidated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const tool = {
      name,
      description,
      parameters: {
        type: "object",
        properties: parameters.reduce((acc, param) => {
          acc[param.name] = {
            type: param.type,
            description: param.description,
          };
          return acc;
        }, {}),
        required: parameters.filter(param => param.required).map(param => param.name),
      },
      code,
    };

    addTool(tool)
      .then(() => handleClose());
  };

  const handleClose = useCallback(() => {
    setName("");
    setDescription("");
    setCode("");
    setParameters([]);
    onClose();
    setValidated(false);
  }, [onClose, setName, setDescription]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Create and add a tool using this form. This tool runs in the same Node environment as the API itself, although with appropriate error checking.</p>

          <hr />

            <Form.Group className="mb-4" controlId="tool-name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                required 
                pattern={NAME_PATTERN}
                placeholder="Enter a name for the tool" 
                value={name} 
                onChange={e => setName(e.target.value)} />
              <Form.Text className="text-muted">
                Tool names can only contain letters, numbers, underscores, and hyphens
              </Form.Text>
              <Form.Control.Feedback type="invalid">Tool names can only contain letters, numbers, underscores, and hyphens</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" required rows={2} placeholder="Enter tool description"  value={description} onChange={e => setDescription(e.target.value)} />
              <Form.Text className="text-muted">
                The description will be sent to the LLM to help it determine when it should use this tool
              </Form.Text>
            </Form.Group>

            <ToolParameterInput 
              onParameterUpdate={setParameters}
            />

            <Form.Group className="mb-3">
              <Form.Label>JavaScript function code</Form.Label>
              <Form.Control as="textarea" required rows={3} placeholder="What will run when the tool is executed?"  value={code} onChange={e => setCode(e.target.value)} />
              <Form.Text className="text-muted">
                The return value of this code will be the output of the tool. Parameters will be passed in using the names specified above. 
                <br />(e.g. function({ parameters.map(p => p.name).join(", ") }) &#123; [function code goes here] &#125;)
              </Form.Text>
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add tool
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
};