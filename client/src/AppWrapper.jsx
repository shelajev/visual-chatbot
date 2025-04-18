import { BackendContextProvider } from './BackendProvider'
import { ToastContainer } from 'react-toastify';
import StandardApp from './StandardApp';
import { useKonami } from "react-konami-code";
import { TutorialContextProvider } from './components/tutorial/TutorialContextProvider';
import { useCallback, useEffect, useState } from 'react';
import { NewApp } from './NewApp';

function AppWrapper() {
  const [useNewVersion, setUseNewVersion] = useState(localStorage.getItem('useNewVersion') === 'true');
  
  const swapApps = useCallback(() => {
    setUseNewVersion(c => !c);
  }, [setUseNewVersion]);

  useEffect(() => {
    localStorage.setItem('useNewVersion', useNewVersion);
  }, [useNewVersion]);

  useKonami(swapApps);

  return (
    <BackendContextProvider>
      <TutorialContextProvider>
        { useNewVersion ? (
          <NewApp />
        ): (
          <StandardApp />
        )}
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
        />
      </TutorialContextProvider>
    </BackendContextProvider>
  )
}

export default AppWrapper
