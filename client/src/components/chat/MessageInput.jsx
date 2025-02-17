import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useMessages } from "../../MessageProvider";

export const MessageInput = () => {
  const { sendMessage, resetMessages, loading } = useMessages();
  const [input, setInput] = useState("");

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      if (input) {
        sendMessage(input);
        setInput("");
      }
    }}>
      <InputGroup>
        <Form.Control 
          type="text" 
          value={input} 
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)} 
        />
        <Button type="submit" disabled={!input || loading} value="Submit">
          { loading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : "Send" }
        </Button>
        <Button type="button" variant="danger" onClick={resetMessages}>Reset conversation</Button>
      </InputGroup>
    </Form>
  )
}