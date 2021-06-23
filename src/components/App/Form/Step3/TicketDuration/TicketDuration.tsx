import { useEffect } from 'react';
import { useFormContext } from 'globalState';
// import dompurify from 'dompurify';
import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import questions from '../../questions';

import { Ticket } from '../../types/Tickets.types';
import s from './TicketDuration.module.scss';

const TicketDuration = ({
  results,
  hasBundleTickets,
}: {
  hasBundleTickets: boolean;
  results: Ticket[];
}) => {
  const name = 'ticketDuration';
  const [{ ticketInfo }, formDispatch] = useFormContext();
  const { ticketType, firstClass } = ticketInfo;
  const { question, hint } = questions[name];

  // Automatically set first class to 'no' if it hasn't been set yet and includes train.
  useEffect(() => {
    if (ticketType === 'nTicket' && !firstClass) {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: { name: 'firstClass', value: 'no', autoAnswered: true },
      });
    }
  }, [firstClass, ticketType, formDispatch]);

  const handleContinue = (value: Ticket) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({
      type: 'UPDATE_TICKET_INFO',
      payload: { name, value: value.validity.toLowerCase(), autoAnswered: false },
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

  const getValidityInfo = (text: string) => {
    switch (text) {
      case '1 Day':
        return { quantity: 1, text: '1 day' };
      case '1 Week':
        return { quantity: 7, text: '1 week' };
      case '1 Month':
        return { quantity: 28, text: '28 days' };
      case '1 Term':
        return { quantity: 90, text: '1 term' };
      case '1 Year':
        return { quantity: 365, text: '52 weeks' };
      default:
        return { quantity: 1, text };
    }
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
              {results!
                .sort((a, b) => a.ticketCurrentAmount - b.ticketCurrentAmount)
                .map((option: Ticket) => {
                  return (
                    <div key={option.id} className="wmnds-col-1 wmnds-col-sm-1-2 wmnds-m-b-lg">
                      <div className={`bg-white wmnds-p-md ${s.ticketCard}`}>
                        {option.standardDiscountCurrentAmount ? (
                          <div>
                            <div className={`wmnds-grid ${s.sale}`}>
                              <h4 className="wmnds-col-auto">
                                {option.buyOnDirectDebit
                                  ? 'Monthly Direct Debit'
                                  : getValidityInfo(option.validity).text}{' '}
                                <span className={s.fullPrice}>
                                  £{option.standardCurrentAmount.toFixed(2)}
                                </span>{' '}
                                <span className={s.salePrice}>
                                  £{option.ticketCurrentAmount.toFixed(2)}
                                </span>
                              </h4>
                              <div className="wmnds-col-auto">
                                <div className={s.saleBadge}>Sale</div>
                              </div>
                            </div>
                            <div className="wmnds-m-b-sm">
                              £
                              {(
                                option.ticketCurrentAmount /
                                getValidityInfo(option.validity).quantity
                              ).toFixed(2)}{' '}
                              per day
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4>
                              {option.buyOnDirectDebit
                                ? 'Monthly Direct Debit'
                                : getValidityInfo(option.validity).text}{' '}
                              <span className={s.totalPrice}>
                                {' '}
                                £{option.ticketCurrentAmount.toFixed(2)}
                              </span>
                            </h4>
                            <div className="wmnds-m-b-sm">
                              £
                              {(
                                option.ticketCurrentAmount /
                                getValidityInfo(option.validity).quantity
                              ).toFixed(2)}{' '}
                              per day
                            </div>
                          </div>
                        )}
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
