/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import dompurify from 'dompurify';
// Import context
import { useFormContext, TForm } from 'globalState';
// Import components
import Icon from 'components/shared/Icon/Icon';
import NIcon from 'components/shared/Icon/NIcon';
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
import usePreviousValue from '../../customHooks/usePreviousValue';
import AutoComplete from './AutoComplete/AutoComplete';
import { AutoCompleteProvider, AutoCompleteContext } from './AutoComplete/AutoCompleteContext';

const { sanitize } = dompurify;

const RailZone = () => {
  const name = 'railZones';
  const { value, handleChange, genericError, error, setError } = useHandleChange(name);
  const [formState, formDispatch] = useFormContext();
  const { apiResults, ticketInfo } = formState;
  const { getAPIResults, loading } = useTicketingAPI();
  const { filterResults } = useTicketFilter();
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;
  const [defaultToAdult, setDefaultToAdult] = useState<boolean>(false);
  const [zonesValid, setZonesValid] = useState<boolean>(false);
  const [selectionValid, setSelectionValid] = useState<boolean>(false);
  const previousStations = usePreviousValue(ticketInfo.stations);

  const { travellerQuery, trainQuery } = useTicketQueries();
  const uniqueOptions = getUniqueOptions(filterResults({ ...travellerQuery, ...trainQuery }), [
    'railZoneFrom',
    'railZoneTo',
  ]);
  const adultTravellerOptions = getUniqueOptions(filterResults({ isAdult: true, ...trainQuery }), [
    'railZoneFrom',
    'railZoneTo',
  ]);

  useEffect(() => {
    if (uniqueOptions.length > 0) {
      setDefaultToAdult(false);
    } else {
      setDefaultToAdult(true);
    }
  }, [uniqueOptions]);

  const options = useMemo(() => {
    const mapZoneOptions = (optionsArray: string[]) => {
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
    return uniqueOptions.length > 0
      ? mapZoneOptions(uniqueOptions)
      : mapZoneOptions(adultTravellerOptions);
  }, [uniqueOptions, adultTravellerOptions]);

  useEffect(() => {
    if (!loading) {
      if (selectionValid && ticketInfo.stations !== previousStations) {
        getAPIResults();
      }
    }
  }, [loading, apiResults, selectionValid, previousStations, ticketInfo.stations, getAPIResults]);

  useEffect(() => {
    const stations = selectedStations.filter((item: any) => item.id !== null);
    const zones = [...stations.map((stn: any) => stn.railZone)];
    const maxZone = Math.max(...zones);

    // Update stations context value on station change
    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'firstClass' } });
    formDispatch({
      type: 'UPDATE_TICKET_INFO',
      payload: {
        name: 'stations',
        value: selectedStations
          .map((station: TForm.IStations) => station.stationName)
          .filter((stn: string) => stn)
          .join(','),
        autoAnswered: false,
      },
    });

    // Update out of county context value on station change
    if (maxZone === 7) {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: {
          name: 'outOfCounty',
          value: true,
          autoAnswered: false,
        },
      });
    } else {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: {
          name: 'outOfCounty',
          value: false,
          autoAnswered: false,
        },
      });
    }
  }, [selectedStations, formDispatch]);

  useEffect(() => {
    // Zone selection is valid if:
    // - at least one zones 1-5 station is selected
    // - no more than one out of county station is selected
    setZonesValid(
      (selectedStations.some((stn: any) => stn.railZone < 7) &&
        selectedStations.filter((stn: any) => stn.railZone === 7).length <= 1) ||
        !selectedStations.some((stn: any) => stn.id),
    );
    setSelectionValid(zonesValid && selectedStations.filter((stn: any) => stn.id).length > 1);
  }, [zonesValid, selectedStations]);

  // Split zone options into recommended and additional options
  const getOptions = () => {
    const stations = selectedStations.filter((item: any) => item.id !== null);
    const zones = [...stations.map((stn: any) => stn.railZone)];
    const minZone = Math.min(...zones);
    const maxZone = Math.max(...zones);

    const allValidOptions = options.filter(
      (o) =>
        o.value.split('+')[0] <= `${minZone}` &&
        o.value.split('+')[1] >= `${maxZone > 5 ? 5 : maxZone}`,
    );
    const additionalOptions = allValidOptions.filter(
      (o) =>
        o.value.split('+')[0] === '1' && o.value.split('+')[1] > `${maxZone > 5 ? 5 : maxZone}`,
    );
    const recommendedOptions = allValidOptions.filter(
      (o) =>
        (o.value.split('+')[0] === '1' &&
          o.value.split('+')[1] === `${maxZone > 5 ? 5 : maxZone}`) ||
        o.value.split('+')[0] === '2',
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
      if (defaultToAdult) {
        formDispatch({
          type: 'UPDATE_TICKET_INFO',
          payload: { name: 'traveller', value: 'adult', autoAnswered: true },
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

        {selectionValid ? (
          <>
            {loading ? (
              <div className="wmnds-col-1 wmnds-m-t-lg">
                <Loader />
              </div>
            ) : (
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
                        {defaultToAdult ? (
                          <div className="wmnds-warning-text wmnds-m-b-md">
                            <Icon
                              iconName="general-warning-circle"
                              className="wmnds-warning-text__icon"
                            />
                            We only sell adult <NIcon str="train" /> tickets. Select a rail zone to
                            continue with an adult ticket.
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
