import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import s from './TicketDuration.module.scss';

const TicketDuration = () => {
  const name = 'ticketDuration';
  const { formDispatch } = useHandleChange(name);
  const { question, hint } = questions[name];
  const handleContinue = (value: string) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
  };
  const { results, loading } = useTicketingAPI('/ticketing/v2/tickets/search');

  return (
    <>
      <QuestionCard showChangeBtn={false}>
        <h2 className="wmnds-fe-question">{question}</h2>
        <p className="wmnds-m-none">{hint}</p>
      </QuestionCard>
      <div className="wmnds-grid wmnds-grid--spacing-sm-2-lg">
        {loading ? (
          <div className="wmnds-col-1">
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <>
                {results.map((option: { [key: string]: string }) => {
                  return (
                    <div key={option.id} className="wmnds-col-1 wmnds-col-sm-1-2 wmnds-m-b-lg">
                      <div className={`bg-white wmnds-p-md ${s.ticketCard}`}>
                        <h4>
                          {option.name}
                          <span className={s.totalPrice}>
                            {' '}
                            £{parseFloat(option.ticketCurrentAmount).toFixed(2)}
                          </span>
                        </h4>
                        {/* <p>£{parseFloat(option.ticketCurrentAmount).toFixed(2)} per day</p> */}
                        <Button
                          btnClass="wmnds-btn--block"
                          text="Select"
                          onClick={() => handleContinue(option.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="wmnds-col-1">
                <h3>No results</h3>
              </div>
            )}
          </>
        )}

        <div className="wmnds-col-1">
          <div className="wmnds-hide-desktop">
            <ChangeAnswers />
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDuration;
