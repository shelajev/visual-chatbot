import { MessageContextProvider } from './MessageProvider'
import App from './App';

function AppWrapper() {
  return (
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  )
}

export default AppWrapper
