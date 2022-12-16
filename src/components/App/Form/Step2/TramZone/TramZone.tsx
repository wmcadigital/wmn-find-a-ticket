import { useContext, useState, useEffect, useMemo } from 'react';
import dompurify from 'dompurify';
// Import context
import { useFormContext, TForm } from 'globalState';
// Import components
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
import Radio from 'components/shared/Radios/Radio/Radio';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Loader from 'components/shared/Loader/Loader';

import getUniqueOptions from '../../helpers/getUniqueOptions';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import useTicketQueries from '../../customHooks/useTicketQueries';
import useTicketFilter from '../../customHooks/useTicketFilter';
import useHandleChange from '../../customHooks/useHandleChange';
import AutoComplete from './AutoComplete/AutoComplete';
import { AutoCompleteProvider, AutoCompleteContext } from './AutoComplete/AutoCompleteContext';

const { sanitize } = dompurify;

const TramZone = () => {
  const name = 'railZones';
  const { value, handleChange, genericError, error, setError } = useHandleChange(name);
  const [formState, formDispatch] = useFormContext();
  const { ticketInfo } = formState;
  const { getAPIResults, loading } = useTicketingAPI();
  const { filterResults } = useTicketFilter();
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;
  const [defaultToAdult, setDefaultToAdult] = useState<boolean>(false);
  const [mustUpdate, setMustUpdate] = useState<boolean>(false);
  const [zonesValid, setZonesValid] = useState<boolean>(false);
  const [selectionValid, setSelectionValid] = useState<boolean>(false);
  // Destructure queries for filter
  const { travellerQuery, tramQuery } = useTicketQueries();
  // Returns the unique options from the API results
  const uniqueOptions = getUniqueOptions(filterResults({ ...travellerQuery, ...tramQuery }), [
    'railZoneFrom',
    'railZoneTo',
  ]);
  // Returns the unique options with traveller as adult from the API results
  const adultTravellerOptions = getUniqueOptions(filterResults({ isAdult: true, ...tramQuery }), [
    'railZoneFrom',
    'railZoneTo',
  ]);

  // If there are no options set default to adult so we can check if adult tickets have options
  useEffect(() => {
    if (uniqueOptions.length > 0) {
      setDefaultToAdult(false);
    } else {
      setDefaultToAdult(true);
    }
  }, [uniqueOptions]);

  const options = useMemo(() => {
    const mapZoneOptions = (optionsArray: string[]) => {
      // Map the zone options to an array
      return optionsArray.map((option) => {
        const zoneOptions = option.split('+');
        return {
          text: `Zone ${zoneOptions[0]}${
            zoneOptions[0] !== zoneOptions[1] ? ` to ${zoneOptions[1]}` : ''
          }`,
          value: option,
        };
      });
    };
    // If there are no uniqueOptions try adultTravellerOptions
    return uniqueOptions.length > 0
      ? mapZoneOptions(uniqueOptions)
      : mapZoneOptions(adultTravellerOptions);
  }, [uniqueOptions, adultTravellerOptions]);

  useEffect(() => {
    // If loading isn't in progress, the autocomplete selection is valid and the selection has changed, get new API results
    if (!loading) {
      if (selectionValid && mustUpdate) {
        setMustUpdate(false);
        getAPIResults();
      }
    }
  }, [loading, mustUpdate, selectionValid, getAPIResults]);

  useEffect(() => {
    const stationValue = selectedStations
      .map((station: TForm.IStations) => station.stationName)
      .filter((stn: string) => stn)
      .join(',');

    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'firstClass' } });
    // Update stations context value on station change
    if (
      stationValue !== ticketInfo.stations &&
      selectedStations.every((stn: any) => 'stationName' in stn)
    ) {
      // Update form state with new stations
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: {
          name: 'stations',
          value: stationValue,
          autoAnswered: false,
        },
      });
    }
  }, [selectedStations, ticketInfo.stations, formDispatch]);
  useEffect(() => {
    // Set zone selection valid if:
    // - at least one zones 1-5 station is selected
    // - no more than one out of county station is selected
    setZonesValid(
      (selectedStations.some((stn: any) => stn.metroZone < 7) &&
        selectedStations.filter((stn: any) => stn.metroZone === 7).length <= 1) ||
        !selectedStations.some((stn: any) => stn.id),
    );
    // Set station selection valid if:
    // - zone selection is valid
    // - there is more than 1 station selected
    setSelectionValid(zonesValid && selectedStations.filter((stn: any) => stn.id).length > 1);
  }, [zonesValid, selectedStations]);

  // Split zone options into recommended and additional options
  const getOptions = () => {
    const stations = selectedStations.filter((item: any) => item.id !== null);

    const zones = [
      ...stations.map((stn: any) =>
        stn.metroZoneSecond === null || stn.metroZoneSecond === undefined
          ? stn.metroZone
          : stn.metroZoneSecond,
      ),
    ];

    const metroZoneFirst = [...stations.map((stn: any) => stn.metroZone)];

    const isToZoneGreater =
      metroZoneFirst.length > 0 ? metroZoneFirst.reduce((a, b) => a === b) : 0;

    const minZone = isToZoneGreater ? Math.min(...metroZoneFirst) : Math.min(...zones);
    const maxZone = isToZoneGreater ? Math.max(...metroZoneFirst) : Math.max(...zones);

    const allValidOptions = options.filter(
      (o) =>
        o.value.split('+')[0] <= `${minZone}` &&
        o.value.split('+')[1] >= `${maxZone > 4 ? 4 : maxZone}`,
    );
    const additionalOptions = allValidOptions.filter(
      (o) =>
        o.value.split('+')[0] === '1' && o.value.split('+')[1] > `${maxZone > 4 ? 4 : maxZone}`,
    );
    const recommendedOptions = allValidOptions.filter(
      (o) =>
        o.value.split('+')[0] === `${minZone}` &&
        o.value.split('+')[1] === `${maxZone > 5 ? 5 : maxZone}`,
    );

    return {
      recommendedOptions: recommendedOptions.length ? recommendedOptions : additionalOptions || [],
      additionalOptions: !recommendedOptions.length ? [] : additionalOptions || [],
    };
  };

  const { recommendedOptions, additionalOptions } = getOptions();

  const handleContinue = () => {
    if (value && value.length !== 0) {
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value, autoAnswered: false } });
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: { name: 'travelTime', value: 'any', autoAnswered: true },
      });
      if (defaultToAdult) {
        formDispatch({
          type: 'UPDATE_TICKET_INFO',
          payload: { name: 'traveller', value: 'adult', autoAnswered: false },
        });
      }
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  return (
    <>
      {genericError}
      <QuestionCard>
        <h2 className="wmnds-fe-question">Which tram stops will you use?</h2>
        <p>Tram stops across the West Midlands are in four zones.</p>
        <p>The zones you can travel between is based on your ticket.</p>
        <AutoComplete />

        {!zonesValid && (
          <Message
            type="error"
            title="Select a station in a West Midlands zone"
            message="Only one out of county station can be selected. Choose a station that is in a West Midlands rail zone."
          />
        )}

        {selectionValid && (
          <>
            {loading ? (
              <div className="wmnds-col-1 wmnds-m-t-lg">
                <Loader text="Finding metro zone options" />
              </div>
            ) : (
              <>
                <div className="wmnds-fe-group wmnds-m-t-lg wmnds-m-b-md">
                  <fieldset className="wmnds-fe-fieldset">
                    <legend className="wmnds-fe-fieldset__legend">
                      <h2 className="wmnds-fe-question">Select your metro zones</h2>
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
                        {defaultToAdult ? (
                          <div className="wmnds-warning-text wmnds-m-b-md">
                            <Icon
                              iconName="general-warning-circle"
                              className="wmnds-warning-text__icon"
                            />
                            Select a metro zone to continue with an adult ticket.
                          </div>
                        ) : (
                          <p>Based on the stations you&rsquo;ve told us about</p>
                        )}
                        {recommendedOptions.length > 0 ? (
                          recommendedOptions.map((option: any) => (
                            <Radio
                              key={`railZones${option.value}`}
                              name="railZones"
                              text={option.text}
                              value={option.value}
                              onChange={handleChange}
                            />
                          ))
                        ) : (
                          <div className="wmnds-warning-text wmnds-m-b-md">
                            <Icon
                              iconName="general-warning-circle"
                              className="wmnds-warning-text__icon"
                            />
                            No results found. Please try a different search.
                          </div>
                        )}
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
                {recommendedOptions.length > 0 && (
                  <Button
                    btnClass="wmnds-col-1 wmnds-col-sm-auto"
                    text="Continue"
                    onClick={handleContinue}
                  />
                )}
              </>
            )}
          </>
        )}
      </QuestionCard>
    </>
  );
};

export default () => {
  return (
    <AutoCompleteProvider>
      <TramZone />
    </AutoCompleteProvider>
  );
};
