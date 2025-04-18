import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SettingsDropdown } from './settings/SettingsDropdown';
import { useTutorial } from './tutorial/TutorialContextProvider';
import { useBackend } from '../BackendProvider';

export function Header({ 
  showTutorial = true,
  title = "Visual Chatbot",
}) {
  const { config } = useBackend();
  const { openTutorialModal } = useTutorial();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">{ title }</Navbar.Brand>
        <Navbar.Text>Using model: { config?.model || "none" }</Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            { showTutorial && (
              <Nav.Link onClick={openTutorialModal}>Tutorial</Nav.Link>
            )}
            <SettingsDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Navbar.Toggle />
    </Navbar>
  );
}