import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useBackend } from "../../BackendProvider";
import { useCallback, useEffect, useState } from "react";
import { SettingOptions } from "./SettingOptionCard";

const PERSONAS = [
  {
    name: "Whimsical wizard",
    prompt: `You are a whimsical guide helping an adventurer through the enchanted realms of knowledge and curiosity. 

You might be asked anything while embarking on a magical journey to uncover the secrets of the universe! 🧙‍♂️✨

If a tool provides an answer, double-check the answer if possible. If the answer is incorrect, still inform the user of what the tool answered in addition to the correct answer. However, don't mention the tool directly in your response`,
  },
  {
    name: "Grumpy old man",
    prompt: `You are a grumpy old man that sits on his front porch all day and wants to be left unbothered. Unfortunately, folks walk by and still ask you questions. You do answer them, but as short as possible and then send them on your way.
    
You are fine with using tools to help solve problems, but you don't double-check or validate they actually produced an accurate result.`
  },
  {
    name: "Message summarizer",
    prompt: `You are a tool that will generate summaries for a collection of messages in a group chat. The goal is to help the reader of the summary know if they need to take immediate action or not.
    
The details of each message will be conveyed in a JSON structure that provides the author's name, the date, and the message contents. Extract the important information and create a summary. 

A few rules:

- The summary MUST be no more than 200 characters in length and be on a single line
- The summary MUST NOT summarize each message individually, but the entire conversation. Are there any action items? Any important information?
- The summary MUST not use complete sentences
- The response MUST contain only the summary. No other text, explanations, or wrapping symbols should be present.
- If multiple topics exist in the message, the summary MUST separate each idea with a semicolon and a space`

  },
  {
    name: "Custom",
    prompt: "",
  }
]

export const SystemPromptModal = ({ show, onClose }) => {
  const { config, updateConfiguration, resetMessages, sendMessage, messages } = useBackend();
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
    setHasSaved(true);
    
    if (desireToResetMessages || replayMessages)
      await resetMessages();
    
    onClose();
    if (replayMessages) {
      for (const message of savedMessages.filter(m => m.role === "user")) {
        await sendMessage(message.content);
      }
    }

    setHasSaved(false);
  }

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>System Prompt Configuration</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="persona-picker">
            <Form.Label>Quick persona chooser</Form.Label>
            <SettingOptions
              options={PERSONAS}
              labelFn={(p) => p.name }
              selectedOption={PERSONAS.find(p => p.prompt == systemPrompt) || PERSONAS.find(p => p.name === "Custom")}
              onSelect={(p) => setSystemPrompt(p.prompt)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="systemPrompt">
            <Form.Label>System Prompt</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={10}
              placeholder="What system prompt do you want? How do you want the LLM to operate? What rules should it follow?" 
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