import { useLayoutEffect, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loader from 'components/shared/Loader/Loader';
import useTicketingAPI from '../customHooks/useTicketingAPI';
import Step4 from './Step4';
import s from '../Form.module.scss';

const TicketPage = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { ticketId } = useParams<any>();
  const location = useLocation();

  const apiOptions = {
    get: true,
    apiPath:
      process.env.NODE_ENV === 'development'
        ? `/ticketing/tickets/${ticketId}/complete/`
        : `/ticketing/v2/tickets/${ticketId}/complete/`,
  };
  const { getAPIResults, results, errorInfo, loading } = useTicketingAPI(apiOptions);
  useLayoutEffect(() => {
    // Run API search if:
    // - A search is not currently loading
    // - There are no results
    if (!loading) {
      if (results && !results.length) {
        if (!errorInfo) {
          getAPIResults();
        }
      }
    }
  }, [getAPIResults, loading, results, errorInfo, ticketId]);

  useEffect(() => {
    if (location.pathname !== '/811') {
      sessionStorage.clear();
    }
  });

  return (
    <div className={`${s.container} wmnds-container wmnds-p-b-lg`}>
      {loading ? (
        <Loader text="Getting ticket details" />
      ) : (
        <Step4 ticket={results && results[0]} />
      )}
    </div>
  );
};

export default TicketPage;
