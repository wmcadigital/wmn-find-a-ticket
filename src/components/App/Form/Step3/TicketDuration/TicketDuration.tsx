import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import Loader from 'components/shared/Loader/Loader';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import { Ticket } from '../../customHooks/Tickets.types';
import s from './TicketDuration.module.scss';

const TicketDuration = () => {
  const name = 'ticketDuration';
  const { formDispatch } = useHandleChange(name);
  const { question, hint } = questions[name];
  const handleContinue = (value: any) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({
      type: 'UPDATE_TICKET_INFO',
      payload: { name, value: value.validity.toLowerCase() },
    });
    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'isMultiDay' } });
    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'multiDay' } });
  };
  const { results, loading } = useTicketingAPI();

  return (
    <>
      <QuestionCard showChangeBtn={false}>
        <h2 className="wmnds-fe-question">{question}</h2>
        <p className="wmnds-m-none">{hint}</p>
      </QuestionCard>
      <div className="wmnds-grid wmnds-grid--spacing-sm-2-lg">
        {loading ? (
          <Loader />
        ) : (
          <>
            {results!.length > 0 ? (
              <>
                {results!.map((option: Ticket) => {
                  return (
                    <div key={option.id} className="wmnds-col-1 wmnds-col-sm-1-2 wmnds-m-b-lg">
                      <div className={`bg-white wmnds-p-md ${s.ticketCard}`}>
                        <h4>
                          {option.name}
                          <span className={s.totalPrice}>
                            {' '}
                            £{option.ticketCurrentAmount.toFixed(2)}
                          </span>
                        </h4>
                        {/* <p>£{parseFloat(option.ticketCurrentAmount).toFixed(2)} per day</p> */}
                        <Button
                          btnClass="wmnds-btn--block"
                          text="Select"
                          onClick={() => handleContinue(option)}
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
