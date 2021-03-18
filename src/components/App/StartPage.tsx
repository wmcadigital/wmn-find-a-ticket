import React, { useState, useEffect } from 'react';
// Contexts
import useStepLogic from './Form/customHooks/useStepLogic';
import Button from '../shared/Button/Button';
import GenericError from '../shared/Errors/GenericError';

function StartPage() {
  const { formState, formDispatch, setStep } = useStepLogic();
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);
  const initialState: { [key: string]: boolean } = {
    bus: false,
    train: false,
    tram: false,
  };
  if (formState.modes) {
    formState.modes.forEach((mode: 'bus' | 'tram' | 'train') => {
      initialState[mode] = true;
    });
  }
  const [selectedModes, setSelectedModes] = useState(initialState);
  const toggleMode = (mode: 'bus' | 'tram' | 'train') => {
    if (!touched) {
      setTouched(true);
    }
    setSelectedModes({ ...selectedModes, [mode]: !selectedModes[mode] });
  };

  useEffect(() => {
    if (Object.values(selectedModes).some((m) => m)) {
      setError(false);
      formDispatch({
        type: 'UPDATE_MODE',
        payload: [...Object.keys(selectedModes).filter((m) => selectedModes[m])],
      });
    } else if (touched) {
      setError(true);
    }
  }, [touched, error, formDispatch, selectedModes]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!error) {
      setStep(1);
    }
  };

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        <h1>Find a ticket</h1>
        <p>Find and buy day, week and season tickets based on the way you travel.</p>
        <div className="wmnds-grid">
          <div className="wmnds-col-2-3">
            {error && (
              <GenericError errors={{ required: { message: 'Please check your responses' } }} />
            )}
            <form className="bg-white wmnds-p-lg wmnds-m-b-lg" onSubmit={handleSubmit}>
              <h2 className="wmnds-fe-question">Which modes of transport will you use? </h2>
              <p>
                Tickets can cover different modes of transport. This means you will not need to have
                separate tickets for your journey.
              </p>
              <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
                {error && (
                  <span className="wmnds-fe-error-message">Please select at least one option</span>
                )}
                <p>Choose all modes of transport you will use.</p>
                <div className="wmnds-grid wmnds-grid--spacing-lg-3-md">
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
                    You can travel on any bus and ride the tram to all stations in the West Midlands
                    Network area with an nNetwork ticket. We will ask you to select which rail zones
                    you want to travel to.
                  </div>
                )}
              </div>
              <Button
                btnClass="wmnds-btn--start"
                iconRight="general-chevron-right"
                text="Start"
                type="submit"
              />
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
