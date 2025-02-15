import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export const ToolParameterInput = ({ onParameterUpdate }) => {
  const [parameters, setParameters] = useState([]);

  const addParameter = () => {
    setParameters([...parameters, { name: "", type: "string", description: "", required: true }]);
  };

  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const updateParameter = (index, key, value) => {
    setParameters(parameters.map((param, i) => i === index ? { ...param, [key]: value } : param));
  };

  useEffect(() => {
    onParameterUpdate(parameters);
  }, [parameters, onParameterUpdate]);

  return (
    <div className="mb-3">
      <div>Tool parameters</div>

      <div className="ms-3">
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th className="text-center">Required?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, i) => (
              <tr key={i}>
                <td>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Name"
                    value={param.name}
                    onChange={(e) => updateParameter(i, "name", e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    value={param.type}
                    onChange={(e) => updateParameter(i, "type", e.target.value)}
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={param.description}
                    onChange={(e) => updateParameter(i, "description", e.target.value)}
                  />
                </td>
                <td className="align-middle text-center">
                  <Form.Check
                    type="checkbox"
                    checked={param.required}
                    onChange={(e) => updateParameter(i, "required", e.target.checked)}
                  />
                </td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => removeParameter(i)}>Remove</Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">
                <Button onClick={addParameter} size="sm">+ Add parameter</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}