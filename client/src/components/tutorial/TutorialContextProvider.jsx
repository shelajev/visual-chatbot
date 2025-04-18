import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { TutorialModal } from "./TutorialModal";
import { useBackend } from "../../BackendProvider";

const TutorialContext = createContext(null);

const steps = [
  { name: "Intro", content: (await import("./steps/introStep.md?raw")).default },
  { name: "Message basics", content: (await import("./steps/messageBasics.md?raw")).default },
  { name: "Going beyond chatbots", content: (await import("./steps/beyond-chatbots.md?raw")).default },
  { name: "Maintaining history", content: (await import("./steps/history.md?raw")).default },
  { name: "RAG (Retrieval Augmented Generation)", content: (await import("./steps/rag.md?raw")).default },
  { name: "Tools", content: (await import("./steps/tools.md?raw")).default },
  { name: "Externalizing tools with MCP", content: (await import("./steps/mcp.md?raw")).default },
  { name: "MCP gateways", content: (await import("./steps/mcp-gateway.md?raw")).default },
];

export const TutorialContextProvider = ({ children }) => {
  const { config } = useBackend();
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasShowedTutorial, setHasShowedTutorial] = useState(false);

  
  const closeTutorialModal = useCallback(
    () => setShouldShowModal(false), 
    [setShouldShowModal]
  );
  
  const openTutorialModal = useCallback(
    () => setShouldShowModal(true), 
    [setShouldShowModal]
  );
  
  const nextStep = useCallback(
    () => setCurrentStep(c => Math.min(steps.length, c + 1)), 
    [setCurrentStep]);
    
  const previousStep = useCallback(
    () => setCurrentStep(c => Math.max(c - 1, 1)), 
    [setCurrentStep]);

  const setActiveStep = useCallback(
    (c) => setCurrentStep(c),
    [setCurrentStep]);
    
  useEffect(() => {
    if (hasShowedTutorial) return;
    if (config.hasApiKey && config.model && config.endpoint) {
      setHasShowedTutorial(true);
      openTutorialModal();
    }
  }, [config, hasShowedTutorial, setHasShowedTutorial, openTutorialModal]);
      
  return (
    <TutorialContext.Provider value={{
      shouldShowModal,
      openTutorialModal,
      closeTutorialModal,

      steps,
      currentStep,
      nextStep,
      previousStep,
      setActiveStep,
    }}>
      <>
        {children}
        <TutorialModal />
      </>
    </TutorialContext.Provider>
  );
}

export const useTutorial = () => useContext(TutorialContext) || {};