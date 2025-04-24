import './App.scss';
import { Header } from './components/Header';
import { TutorialDisplay } from './components/tutorial/TutorialDisplay';
import { TutorialActions } from './components/tutorial/TutorialActions';
import { MessageSidebar } from './components/MessageSidebar';
import { TutorialStepSelector } from './components/tutorial/TutorialStepSelector';

export function TutorialApp() {

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header title="AI Trainer" showTutorial={false} />

        <div className="d-flex flex-grow-1 overflow-auto">
          <div className="flex-grow-1 overflow-auto p-5 w-50">
            <div className="mb-3">
              <TutorialStepSelector />
              <TutorialDisplay />
            </div>
            <div className="text-center">
              <TutorialActions />
            </div>
          </div>
          <div className="w-50 p-3 overflow-auto bg-light">
            <MessageSidebar />
          </div>
        </div>
      </div>
    </>
  )
}
