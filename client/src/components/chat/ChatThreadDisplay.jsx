import Container from "react-bootstrap/Container";
import { useBackend } from "../../BackendProvider";
import { ChatMessageDisplay } from "./ChatMessageDisplay";
import { useCallback, useState } from "react";
import { MessageDetailsDialog } from "./MessageDetailsDialog";

export const ChatThreadDisplay = ({
  MessageComponent = ChatMessageDisplay,
}) => {
  const { messages, deleteMessage } = useBackend();
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  const handleSelectMessage = useCallback((message) => {
    setSelectedMessageIndex(message);
  }, [setSelectedMessageIndex]);

  const onDialogClose = useCallback(() => {
    setSelectedMessageIndex(null);
  }, [setSelectedMessageIndex]);

  return (
    <>
      <Container fluid>
        {messages.map((message, index) => (
          <MessageComponent 
            key={index} 
            message={message} 
            onSelect={() => handleSelectMessage(index)}
          />
        ))}
      </Container>

      <MessageDetailsDialog
        selectedMessageIndex={selectedMessageIndex}
        messages={messages}
        onClose={onDialogClose}
        onDeleteMessage={deleteMessage}
      />
    </>
  )
}