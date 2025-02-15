import './App.scss'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useMessages } from './MessageProvider'
import { MessageInput } from './components/MessageInput'
import { ChatThreadDisplay } from './components/ChatThreadDisplay'
import { ToolCollectionDisplay } from './components/tools/ToolCollectionDisplay';
import { LlmConfigurationModal } from './components/LlmConfigurationModal';
import { useEffect, useState } from 'react';
import { SystemPromptModal } from './components/SystemPromptModal';

function App() {
  const { config } = useMessages();
  const [showLlmConfigModal, setShowLlmConfigModal] = useState(false);
  const [showSystemPromptModal, setSystemPromptModal] = useState(false);

  useEffect(() => {
    setShowLlmConfigModal(!config.hasApiKey);
  }, [config, setShowLlmConfigModal]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Visual Chatbot</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="#" onClick={() => setSystemPromptModal(true)}>System Prompt</Nav.Link>
                <Nav.Link href="#" onClick={() => setShowLlmConfigModal(true)}>LLM Settings</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Navbar.Toggle />
        </Navbar>

        <div className="d-flex flex-grow-1 overflow-auto">
          <div className="flex-grow-1 overflow-auto p-3 w-75">
            <ChatThreadDisplay />
          </div>
          <div className="w-25 p-3 bg-light">
            <ToolCollectionDisplay />
          </div>
        </div>


        <div className="p-3 bg-light pe-5 ps-5 border-top">
          <MessageInput />
        </div>
      </div>
      
      <LlmConfigurationModal 
        show={showLlmConfigModal} 
        onClose={() => setShowLlmConfigModal(false)} 
      />
      
      <SystemPromptModal 
        show={showSystemPromptModal} 
        onClose={() => setSystemPromptModal(false)} 
      />
    </>
  )
}

export default App
