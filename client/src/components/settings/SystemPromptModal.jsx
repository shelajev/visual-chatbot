import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMessages } from "../../MessageProvider";
import { useCallback, useEffect, useState } from "react";

export const SystemPromptModal = ({ show, onClose }) => {
  const { config, updateConfiguration, resetMessages, sendMessage, messages } = useMessages();
  const [systemPrompt, setSystemPrompt] = useState(config.systemPrompt);
  const [desireToResetMessages, setDesireToResetMessages] = useState(false);
  const [replayMessages, setReplayMessages] = useState(false);
  const [savedMessages, setSavedMessages] = useState(messages);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    if (!hasSaved)
      setSavedMessages(messages);
  }, [messages, hasSaved])

  const handleClose = useCallback(() => {
    onClose();
    setHasSaved(false);
  }, [onClose]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateConfiguration({ systemPrompt, });

    if (desireToResetMessages || replayMessages)
      await resetMessages();

    if (replayMessages) {
      for (const message of savedMessages.filter(m => m.role === "user")) {
        await sendMessage(message.content);
      }
    }

    setHasSaved(true);
    onClose();
  }

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>System Prompt Configuration</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>          
          <Form.Group className="mb-3" controlId="systemPrompt">
            <Form.Label>System Prompt</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={10}
              placeholder="Endpoint" 
              value={systemPrompt} 
              onChange={e => setSystemPrompt(e.target.value)} 
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="clear-messages"
            label="Reset messages on save"
            checked={replayMessages ? true : desireToResetMessages}
            disabled={replayMessages}
            onChange={(e) => setDesireToResetMessages(e.target.checked)}
          />

          <Form.Check
            type="switch"
            label="Replay user messages on new system prompt"
            id="replay-messages"
            checked={replayMessages}
            onChange={(e) => setReplayMessages(e.target.checked)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>

      </Form>
    </Modal>
  );
}