import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useBackend } from "../../BackendProvider";
import { useCallback, useEffect, useState } from "react";
import { SettingOptions } from "./SettingOptionCard";

export const LlmConfigurationModal = ({ show, onClose }) => {
  const { config, getBackendOptions, updateConfiguration } = useBackend();
  const [backendOptions, setBackendOptions] = useState(null);
  const [selectedBackend, setSelectedBackend] = useState(null);
  const [apiKeyRequired, setApiKeyRequired] = useState(config?.endpoint?.indexOf("openai") > -1);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(config.model);
  const [endpoint, setEndpoint] = useState(config.endpoint || "");

  useEffect(() => {
    if (!show) return;
    getBackendOptions().then(setBackendOptions);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    setModel(config.model);
    setEndpoint(config.endpoint);
  }, [show, config]);

  useEffect(() => {
    if (!backendOptions) return;

    setSelectedBackend(
      backendOptions.find(b => b.endpoint === config.endpoint)
    );
  }, [backendOptions, config.endpoint])

  const handleClose = useCallback(() => {
    onClose();
    setApiKey("");
  }, [onClose]);

  if (!backendOptions) return;

  return (
    <Modal size="xl" show={show} backdrop={config.endpoint ? true : "static"} keyboard={config.hasApiKey} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>LLM connection configuration</Modal.Title>
      </Modal.Header>

      <Form onSubmit={e => {
        e.preventDefault();
        updateConfiguration({ 
          apiKey: (apiKeyRequired) ? apiKey : undefined, 
          model, 
          endpoint 
        });
      }}>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="llmBackend">
            <Form.Label>LLM backend</Form.Label>
            <SettingOptions
              options={backendOptions}
              labelFn={(option) => option.name}
              selectedOption={selectedBackend}
              onSelect={(option) => {
                setEndpoint(option.endpoint);
                setSelectedBackend(option);
                setApiKeyRequired(option.requiresApiKey);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Model</Form.Label>
            <SettingOptions
              options={selectedBackend?.models}
              labelFn={(m) => m}
              selectedOption={model}
              onSelect={(m) => setModel(m)}
            />
          </Form.Group>

          { apiKeyRequired && (
            <Form.Group className="mb-3" controlId="apiKey">
              <Form.Label className={config.hasApiKey ? "" : "fw-bold"}>API Key</Form.Label>
              <Form.Control 
                required={!config.hasApiKey}
                type="text" 
                placeholder={config.hasApiKey ? "Already set. Replace if needed" : "API Key"}
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)} 
              />
            </Form.Group>
          )}

        </Modal.Body>

        <Modal.Footer>
          { config.endpoint && <Button variant="secondary" onClick={handleClose}>Cancel</Button> }
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}