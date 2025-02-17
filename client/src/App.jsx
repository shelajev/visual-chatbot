import './App.scss'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { MessageInput } from './components/chat/MessageInput';
import { ChatThreadDisplay } from './components/chat/ChatThreadDisplay';
import { Sidebar } from './components/Sidebar';
import { SettingsDropdown } from './components/settings/SettingsDropdown';

function App() {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Visual Chatbot</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <SettingsDropdown />
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Navbar.Toggle />
        </Navbar>

        <div className="d-flex flex-grow-1 overflow-auto">
          <div className="flex-grow-1 overflow-auto p-3 w-75">
            <ChatThreadDisplay />
          </div>
          <div className="w-25 p-3 overflow-auto bg-light">
            <Sidebar />
          </div>
        </div>


        <div className="p-3 bg-light pe-5 ps-5 border-top">
          <MessageInput />
        </div>
      </div>
    </>
  )
}

export default App
