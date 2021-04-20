/* eslint-disable prettier/prettier */
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// Import contexts

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useTicketingAPI = (apiPath: string) => {
  // State variables
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState<IError | null>(null); // Placeholder to set error messaging

  // Reference variables
  const mounted = useRef<any>();
  const source = useRef<any>();
  const apiTimeout = useRef<any>();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const handleAutoCompleteApiResponse = useCallback((response) => {
    setLoading(false); // Set loading state to false after data is received
    setResults(response);

    if (!response && mounted.current) {
      setErrorInfo({
        title: 'No results found',
        message: 'Make sure you are looking for the right service, and try again.',
      });
    }
  }, []);

  const handleAutoCompleteApiError = (error: any) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(error),
    });
    setResults([]); // Reset the results so that the dropdown disappears
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAutoCompleteResults = useCallback(() => {
    const query = {
      allowTrain: 'true',
      allowBus: 'false',
      allowMetro: 'false',
      outOfCounty: 'true',
    };
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    axios
      .post(REACT_APP_API_HOST + apiPath, query, {
        headers: {
          'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
        },
        cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
      })
      .then(handleAutoCompleteApiResponse)
      .catch(handleAutoCompleteApiError);
  }, [apiPath, handleAutoCompleteApiResponse, startApiTimeout]);

  useEffect(() => {
    getAutoCompleteResults();
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAutoCompleteResults]);

  return { loading, errorInfo, results, getAutoCompleteResults };
};

export default useTicketingAPI;
