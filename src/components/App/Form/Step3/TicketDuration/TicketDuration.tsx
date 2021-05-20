import { useFormContext } from 'globalState';
// import dompurify from 'dompurify';
import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import { ReplaceTextWithIcon } from 'components/shared/Icon/NIcon';
import questions from '../../questions';

import { Ticket } from '../../customHooks/Tickets.types';
import s from './TicketDuration.module.scss';

const TicketDuration = ({
  results,
  hasBundleTickets,
}: {
  hasBundleTickets: boolean;
  results: Ticket[];
}) => {
  const name = 'ticketDuration';
  const [, formDispatch] = useFormContext();

  const { question, hint } = questions[name];
  const handleContinue = (value: Ticket) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({
      type: 'UPDATE_TICKET_INFO',
      payload: { name, value: value.validity.toLowerCase() },
    });
    if (value.validity.toLowerCase() !== '1 day' || !hasBundleTickets) {
      formDispatch({
        type: 'UPDATE_TICKET_ID',
        payload: `${value.id}`,
      });
    }
    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'isMultiDay' } });
    formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'multiDay' } });
  };

  return (
    <>
      <QuestionCard showChangeBtn={false}>
        <h2 className="wmnds-fe-question">{question}</h2>
        <p className="wmnds-m-none">{hint}</p>
      </QuestionCard>
      <div className="wmnds-grid wmnds-grid--spacing-sm-2-lg">
        <>
          {results && results!.length > 0 ? (
            <>
              {results!.map((option: Ticket) => {
                return (
                  <div key={option.id} className="wmnds-col-1 wmnds-col-sm-1-2 wmnds-m-b-lg">
                    <div className={`bg-white wmnds-p-md ${s.ticketCard}`}>
                      <h4>
                        <ReplaceTextWithIcon htmlElement={option.name} />
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
