import Form from "react-bootstrap/Form";
import { useTutorial } from "./TutorialContextProvider";

export function TutorialStepSelector() {
  const { steps, currentStep, setActiveStep } = useTutorial();

  if (!steps) return;

  return (
    <div className="mb-3">
      <Form.Select 
        aria-label="Tutorial step selector" 
        value={currentStep}
        onChange={(e) => setActiveStep(parseInt(e.target.value))}
      >
        {steps.map((step, index) => (
          <option key={index} value={index + 1}>
            {index + 1}. {step.name}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}