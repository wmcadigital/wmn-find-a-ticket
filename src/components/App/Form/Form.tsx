import { useLayoutEffect } from 'react';
import Loader from 'components/shared/Loader/Loader';
import useStepLogic from './customHooks/useStepLogic';
import useTicketingAPI from './customHooks/useTicketingAPI';
import SidebarSummary from './SidebarSummary/SidebarSummary';
import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';
import s from './Form.module.scss';
import arrayToSentence from './helpers/arrayToSentence';
import { Ticket } from './types/Tickets.types';

const Form = ({ prevMode }: { prevMode: string[] }) => {
  const { formState } = useStepLogic();
  const { currentStep, ticketInfo, ticketId, showAnswers } = formState;
  const apiOptions = {
    apiPath:
      process.env.NODE_ENV === 'development'
        ? '/ticketing/tickets/search/complete'
        : '/ticketing/v2/tickets/search/complete',
  };
  const { getAPIResults, results, errorInfo, loading } = useTicketingAPI(apiOptions);
  useLayoutEffect(() => {
    // Run API search if:
    // - A search is not currently loading
    // - Train mode is not selected
    // - There are no results
    // - If modes have changed
    if (!loading) {
      if ((results && !results.length) || (prevMode !== ticketInfo.modes && !ticketId)) {
        if (!errorInfo) {
          getAPIResults();
        }
      }
    }
  }, [getAPIResults, loading, results, prevMode, ticketInfo.modes, errorInfo, ticketId]);

  const ticket: Ticket | null =
    formState.apiResults?.find((t) => formState.ticketId === `${t.id}`) || null;

  return (
    <div className={`${s.container} wmnds-container wmnds-p-b-lg`}>
      {loading ? (
        <Loader
          text={
            ticketId
              ? 'Getting ticket details'
              : `Finding ${arrayToSentence(ticketInfo.modes as string[])} options`
          }
        />
      ) : (
        <>
          {currentStep === 4 ? (
            <Step4 ticket={ticket} />
          ) : (
            <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
              <div className="wmnds-col-1-1 wmnds-col-md-2-3">
                <form>
                  {currentStep === 1 && <Step1 />}
                  {currentStep === 2 && <Step2 />}
                  {currentStep === 3 && <Step3 />}
                </form>
              </div>
              <div className="wmnds-col-1-1 wmnds-col-md-1-3">
                {showAnswers && (
                  <div className="wmnds-hide-desktop">
                    <SidebarSummary />
                  </div>
                )}
                <div className="wmnds-hide-mobile">
                  <SidebarSummary />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Form;
