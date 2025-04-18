import './App.scss'
import { MessageInput } from './components/chat/MessageInput';
import { ChatThreadDisplay } from './components/chat/ChatThreadDisplay';
import { ChatbotSidebar } from './components/ChatbotSidebar';
import { Header } from './components/Header';

function StandardApp() {

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        
        <div className="d-flex flex-grow-1 overflow-auto">
          <div className="flex-grow-1 overflow-auto p-3 w-75">
            <ChatThreadDisplay />
          </div>
          <div className="w-25 p-3 overflow-auto bg-light">
            <ChatbotSidebar />
          </div>
        </div>


        <div className="p-3 bg-light pe-5 ps-5 border-top">
          <MessageInput />
        </div>
      </div>
    </>
  )
}

export default StandardApp
