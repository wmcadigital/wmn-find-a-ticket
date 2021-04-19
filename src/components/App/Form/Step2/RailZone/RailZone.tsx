import React, { useContext, useState, useEffect } from 'react';
import dompurify from 'dompurify';
// Import context
import { useFormContext, TForm } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
import Radio from 'components/shared/Radios/Radio/Radio';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';

import useHandleChange from '../../customHooks/useHandleChange';
import AutoComplete from './AutoComplete/AutoComplete';
import { AutoCompleteProvider, AutoCompleteContext } from './AutoComplete/AutoCompleteContext';

const { sanitize } = dompurify;

const RailZone = () => {
  interface IZoneOptions {
    text: string;
    value: string;
  }

  const name = 'railZones';
  const { value, handleChange, genericError, error, setError } = useHandleChange(name);
  const [, formDispatch] = useFormContext();
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;
  const [zonesValid, setZonesValid] = useState<boolean>(false);
  const [recommendedOptions, setRecommendedOptions] = useState<IZoneOptions[] | []>([]);
  const [additionalOptions, setAdditionalOptions] = useState<IZoneOptions[] | []>([]);

  const handleContinue = () => {
    if (value && value.length !== 0) {
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: {
          name: 'stations',
          value: selectedStations
            .map((station: TForm.IStations) => station.stationName)
            .filter((stn: string) => stn),
        },
      });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  useEffect(() => {
    const options = [
      {
        text: 'Zone 1 to 2',
        value: '1+2',
      },
      {
        text: 'Zone 1 to 3',
        value: '1+3',
      },
      {
        text: 'Zone 1 to 4',
        value: '1+4',
      },
      {
        text: 'Zone 1 to 5',
        value: '1+5',
      },
      {
        text: 'Zone 2 to 5',
        value: '2+5',
      },
    ];

    // Zone selection is valid if:
    // - at least one zones 1-5 station is selected
    // - no more than one out of county station is selected
    setZonesValid(
      (selectedStations.some((stn: any) => stn.railZone < 7) &&
        selectedStations.filter((stn: any) => stn.railZone === 7).length <= 1) ||
        !selectedStations.some((stn: any) => stn.id),
    );

    // Get valid selected stations
    const stations = selectedStations.filter((item: any) => item.id !== null);
    const zones = [...stations.map((stn: any) => stn.railZone)];
    const minZone = Math.min(...zones);
    const maxZone = Math.max(...zones);

    // Set zoneOptions if:
    // - zone selection is valid
    // - more than one station is selected
    if (zonesValid && selectedStations.filter((stn: any) => stn.id).length > 1) {
      const allValidOptions = options.filter(
        (o) =>
          o.value.split('+')[0] <= `${minZone}` &&
          o.value.split('+')[1] >= `${maxZone > 5 ? 5 : maxZone}`,
      );
      setRecommendedOptions(
        allValidOptions.filter(
          (o) =>
            (o.value.split('+')[0] === '1' &&
              o.value.split('+')[1] === `${maxZone > 5 ? 5 : maxZone}`) ||
            o.value.split('+')[0] === '2',
        ),
      );
      setAdditionalOptions(
        allValidOptions.filter(
          (o) =>
            o.value.split('+')[0] === '1' && o.value.split('+')[1] > `${maxZone > 5 ? 5 : maxZone}`,
        ),
      );
    } else {
      setRecommendedOptions([]);
    }
  }, [zonesValid, selectedStations]);

  return (
    <>
      {genericError}
      <QuestionCard>
        <h2 className="wmnds-fe-question">Which train stations will you use?</h2>
        <p>Train stations in the West Midlands are in zones.</p>
        <p>You can choose which zones your train ticket will cover.</p>
        <p>You can only choose one Out of County station.</p>
        <AutoComplete />

        {zonesValid ? (
          <></>
        ) : (
          <Message
            type="error"
            title="Select a station in a West Midlands zone"
            message="Only one out of county station can be selected. Choose a station that is in a West Midlands rail zone."
          />
        )}

        {recommendedOptions.length > 0 ? (
          <>
            <div className="wmnds-fe-group wmnds-m-t-lg wmnds-m-b-md">
              <fieldset className="wmnds-fe-fieldset">
                <legend className="wmnds-fe-fieldset__legend">
                  <h2 className="wmnds-fe-question">Select your rail zones</h2>
                </legend>
                <div className={error ? ' wmnds-fe-group--error' : ''}>
                  {/* If there is an error, show here */}
                  {error && (
                    <span
                      className="wmnds-fe-error-message"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(error.message),
                      }}
                    />
                  )}
                  <div className="wmnds-fe-radios wmnds-fe-radios--inline wmnds-m-b-md">
                    <p>Based on the stations you&rsquo;ve told us about</p>
                    {recommendedOptions.map((option: any) => (
                      <Radio
                        key={`railZones${option.value}`}
                        name="railZones"
                        text={option.text}
                        value={option.value}
                        onChange={handleChange}
                      />
                    ))}
                    {additionalOptions.length > 0 && (
                      <details className="wmnds-details wmnds-m-t-sm wmnds-m-b-md">
                        <summary className="wmnds-link">I need to travel in more zones</summary>
                        <div className="wmnds-details__content">
                          <p>Select a different zone</p>
                          {additionalOptions.map((option: any) => (
                            <Radio
                              key={`railZones${option.value}`}
                              name="railZones"
                              text={option.text}
                              value={option.value}
                              onChange={handleChange}
                            />
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>
            <Button
              btnClass="wmnds-col-1 wmnds-col-sm-auto"
              text="Continue"
              onClick={handleContinue}
            />
          </>
        ) : (
          <></>
        )}
      </QuestionCard>
    </>
  );
};

export default () => {
  return (
    <AutoCompleteProvider>
      <RailZone />
    </AutoCompleteProvider>
  );
};
