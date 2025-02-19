import { BackendContextProvider } from './BackendProvider'
import { ToastContainer } from 'react-toastify';
import App from './App';

function AppWrapper() {
  return (
    <BackendContextProvider>
      <App />
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
      />
    </BackendContextProvider>
  )
}

export default AppWrapper
