import { useEffect, useContext, useState, useRef, useCallback } from 'react';
// Import contexts
import { AutoCompleteContext } from '../AutoCompleteContext';
// Import json data
import railData from '../../TramData.json';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useAutoComplete = (queryId: number) => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState<IError | null>(null); // Placeholder to set error messaging
  const selectedService = autoCompleteState.selectedStations[queryId];
  const query = autoCompleteState.queries[queryId];
  // Reference variables
  const mounted = useRef<Boolean>();
  // Helper functions

  const handleAutoCompleteResponse = useCallback(
    (response) => {
      setLoading(false); // Set loading state to false after data is received
      let payload;

      setResults(response || []);
      // Grab info matching rail data from json file
      const result =
        railData.metroStations.filter((service) => service.crsCode === selectedService.id)[0] ||
        null;

      if (result) {
        if (selectedService.id && response.length) {
          if (!result.metroZone) {
            result.metroZone = 7; // if there is no zone assign '7' (Out of county)
          }
          // Set data to add to context state
          payload = {
            id: result.crsCode,
            queryId,
            ...result,
          };
        }

        // Update selectedStation based on payload set above if item already selected
        if (selectedService.id) {
          autoCompleteDispatch({
            type: 'UPDATE_SELECTED_STATION',
            payload,
          });
        }
      }

      if (!response.length && mounted.current) {
        // If there is no data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
        // if no data, set error
        setErrorInfo({
          title: 'No results found',
          message: 'Make sure you are looking for the right service, and try again.',
        });
      }
    },
    [selectedService.id, autoCompleteDispatch, queryId], // [autoCompleteDispatch, selectedService.id]
  );

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAutoCompleteResults = useCallback(() => {
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    setLoading(true);
    let response;
    if (query) {
      response = railData.metroStations.filter(({ stationName }) =>
        stationName.toLowerCase().includes(query.trim().toLowerCase()),
      );
    } else {
      response = railData.metroStations;
    }
    handleAutoCompleteResponse(response);
  }, [handleAutoCompleteResponse, query]);

  useEffect(() => {
    getAutoCompleteResults();
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
    };
  }, [getAutoCompleteResults]);

  return { loading, errorInfo, results, getAutoCompleteResults };
};

export default useAutoComplete;
