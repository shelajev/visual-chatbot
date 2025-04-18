import Button from "react-bootstrap/Button";
import { useTutorial } from "./TutorialContextProvider";

export function TutorialActions({ onClose }) {
  const { currentStep, steps, nextStep, previousStep } = useTutorial();

  return (
    <>
      <Button className="me-2" variant="primary" onClick={previousStep} disabled={currentStep === 1}>Prev</Button>
      { onClose && (
        <Button className="me-2" variant="secondary" onClick={onClose}>Close</Button>
      )}
      <Button className="me-2" variant="primary" onClick={nextStep} disabled={currentStep === steps.length}>Next</Button>
    </>
  );
}