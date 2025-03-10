import { BackendContextProvider } from './BackendProvider'
import { ToastContainer } from 'react-toastify';
import App from './App';
import { TutorialContextProvider } from './components/tutorial/TutorialContextProvider';

function AppWrapper() {
  return (
    <BackendContextProvider>
      <TutorialContextProvider>
        <App />
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
        />
      </TutorialContextProvider>
    </BackendContextProvider>
  )
}

export default AppWrapper
