import { BackendContextProvider } from './BackendProvider'
import { ToastContainer } from 'react-toastify';
import StandardApp from './StandardApp';
import { useKonami } from "react-konami-code";
import { TutorialContextProvider } from './components/tutorial/TutorialContextProvider';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { TutorialApp } from './TutorialApp';

const AppModeContext = createContext({
  useTutorialMode: false,
  toggleModes: () => {},
});

export const useAppMode = () => useContext(AppModeContext);

function AppWrapper() {
  const [useTutorialMode, setUseTutorialMode] = useState(localStorage.getItem('setUseTutorialMode') === 'true');
  
  const swapApps = useCallback(() => {
    setUseTutorialMode(c => !c);
  }, [setUseTutorialMode]);

  useEffect(() => {
    localStorage.setItem('setUseTutorialMode', useTutorialMode);
  }, [useTutorialMode]);

  useKonami(swapApps);

  return (
    <BackendContextProvider>
      <TutorialContextProvider>
        <>
          <AppModeContext.Provider value={{ useTutorialMode, toggleModes: swapApps }}>
            { useTutorialMode ? (
              <TutorialApp />
            ): (
              <StandardApp />
            )}
          </AppModeContext.Provider>
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
          />
        </>
      </TutorialContextProvider>
    </BackendContextProvider>
  )
}

export default AppWrapper
