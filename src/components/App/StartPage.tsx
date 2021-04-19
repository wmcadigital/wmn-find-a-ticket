import { useState, useEffect } from 'react';
import { TForm } from 'globalState';
// Contexts
import useStepLogic from './Form/customHooks/useStepLogic';
// Components
import Button from '../shared/Button/Button';
import GenericError from '../shared/Errors/GenericError';
import QuestionCard from '../shared/QuestionCard/QuestionCard';

function StartPage() {
  const { formState, formDispatch, runStepLogic } = useStepLogic();
  const [touched, setTouched] = useState(false); // state set to true when user has made a change
  const [error, setError] = useState(false); // init error state
  // Initial state for selected modes
  const initialState: { [key in TForm.Modes]: boolean } = {
    bus: false,
    train: false,
    tram: false,
  };
  // Set initial state to match globalState if modes are already selected
  if (formState.ticketInfo.modes?.length) {
    formState.ticketInfo.modes.forEach((mode) => {
      initialState[mode!] = true; // assert mode type as it can never  be null here
    });
  }
  const [selectedModes, setSelectedModes] = useState(initialState); // init selected modes with initialState
  // FN to toggle selected modes on or off
  const toggleMode = (mode: TForm.Modes) => {
    if (!touched) {
      // Set touched to true as user made a change
      setTouched(true);
    }
    // Add new mode state to selected modes
    setSelectedModes({ ...selectedModes, [mode]: !selectedModes[mode] });
  };

  useEffect(() => {
    // Check if at least one selectedMode value is true
    if (Object.values(selectedModes).some((m) => m)) {
      // If so set error to false
      setError(false);
    } else if (touched) {
      // If not there is an error so set error to true
      setError(true);
    }
  }, [touched, error, selectedModes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(selectedModes).some((m) => m) && !error) {
      // If no errors, proceed to update state
      formDispatch({
        type: 'UPDATE_MODE',
        // Spread the object keys with true values to update global state
        payload: [...(Object.keys(selectedModes) as TForm.Modes[]).filter((m) => selectedModes[m])],
      });
      // setTicketType();
      runStepLogic();
    } else {
      setError(true);
    }
  };

  return (
    <div className="wmnds-container wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        <h1 className="wmnds-p-t-md">Find a ticket</h1>
        <p>Find and buy day, week and season tickets based on the way you travel.</p>
        <div className="wmnds-grid">
          <div className="wmnds-col-md-2-3">
            {error && (
              <GenericError errors={{ required: { message: 'Please check your responses' } }} />
            )}
            <form onSubmit={handleSubmit}>
              <QuestionCard showChangeBtn={false}>
                <h2 className="wmnds-fe-question">Which modes of transport will you use? </h2>
                <p>
                  Tickets can cover different modes of transport. This means you will not need to
                  have separate tickets for your journey.
                </p>
                <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
                  {error && (
                    <span className="wmnds-fe-error-message">
                      Please select at least one option
                    </span>
                  )}
                  <p>Choose all modes of transport you will use.</p>
                  <div className="wmnds-grid wmnds-grid--spacing-3-md">
                    <div className="wmnds-col-auto">
                      <Button
                        text=" Bus"
                        btnClass="wmnds-btn--mode"
                        iconLeft="modes-isolated-bus"
                        isActive={selectedModes.bus}
                        onClick={() => toggleMode('bus')}
                      />
                    </div>
                    <div className="wmnds-col-auto">
                      <Button
                        text=" Train"
                        btnClass="wmnds-btn--mode"
                        iconLeft="modes-isolated-rail"
                        isActive={selectedModes.train}
                        onClick={() => toggleMode('train')}
                      />
                    </div>
                    <div className="wmnds-col-auto">
                      <Button
                        text=" Tram"
                        btnClass="wmnds-btn--mode"
                        iconLeft="modes-isolated-metro"
                        isActive={selectedModes.tram}
                        onClick={() => toggleMode('tram')}
                      />
                    </div>
                  </div>
                  {selectedModes.bus && selectedModes.train && selectedModes.tram && (
                    <div className="wmnds-inset-text wmnds-m-t-md">
                      You can travel on any bus and ride the tram to all stations in the West
                      Midlands Network area with an nNetwork ticket. We will ask you to select which
                      rail zones you want to travel to.
                    </div>
                  )}
                </div>
                <Button
                  btnClass="wmnds-btn--start wmnds-col-1 wmnds-col-sm-auto"
                  iconRight="general-chevron-right"
                  text={formState.editMode ? 'Continue' : 'Start'}
                  type="submit"
                />
              </QuestionCard>
            </form>
            <h2>Other tickets</h2>
            <p>
              You can find single and return fares when you{' '}
              <a href="https://wmnetwork.co.uk">plan a journey</a>. You usually buy these on your
              journey.
            </p>
            <p>
              You can also pay for buses and trams with Swift Go or a pay as you go{' '}
              <a href="https://wmnetwork.co.uk">Swift card</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
