import { useEffect } from 'react';
import { useFormContext } from 'globalState';
// import dompurify from 'dompurify';
import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import questions from '../../questions';
import useConvertDescription from '../../Step4/customHooks/useConvertDescription';

import { Ticket } from '../../types/Tickets.types';
import s from './TicketDuration.module.scss';

const TicketDuration = ({
  results: res,
  hasBundleTickets,
}: {
  hasBundleTickets: boolean;
  results: Ticket[];
}) => {
  const name = 'ticketDuration';
  const [{ ticketInfo }, formDispatch] = useFormContext();
  const { ticketType, firstClass } = ticketInfo;
  const { question, hint } = questions[name];
  const { filterTermDates } = useConvertDescription();
  const results = filterTermDates(res);

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
      case '1':
        return '1 day';
      case '7':
        return '1 week';
      case '14':
        return '14 days';
      case '28':
        return '28 days';
      case '30':
        return '1 month';
      case '31':
        return 'Monthly Direct Debit';
      case '91':
        return '13 weeks';
      case '115':
      case '122':
        return '1 term';
      case '244':
        return '2 terms';
      case '344':
      case '365':
        return '52 weeks';
      default:
        return text;
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
                  const isSale = option.ticketCurrentAmount < option.standardCurrentAmount;
                  return (
                    <div key={option.id} className="wmnds-col-1 wmnds-col-sm-1-2 wmnds-m-b-lg">
                      <div className={`bg-white wmnds-p-md ${s.ticketCard}`}>
                        {isSale ? (
                          <div>
                            <div className={`wmnds-grid ${s.sale}`}>
                              <h4 className="wmnds-col-auto">
                                {option.buyOnDirectDebit
                                  ? 'Monthly Direct Debit'
                                  : getValidityInfo(option.validityDays)}{' '}
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
                              {option.validityDays === '1' ? (
                                <span>This is also a daily fare cap on Swift Go.</span>
                              ) : (
                                <>
                                  £
                                  {(
                                    option.ticketCurrentAmount / parseInt(option.validityDays, 10)
                                  ).toFixed(2)}{' '}
                                  per day
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            {option.ticketCurrentAmount === 0 && option.validityDays === '1' ? (
                              <h4>Swift Go</h4>
                            ) : (
                              <h4>
                                <>
                                  {option.buyOnDirectDebit
                                    ? 'Monthly Direct Debit'
                                    : getValidityInfo(option.validityDays)}{' '}
                                  <span className={s.totalPrice}>
                                    {' '}
                                    {option.ticketCurrentAmount > 0 && (
                                      <>£{option.ticketCurrentAmount.toFixed(2)}</>
                                    )}
                                  </span>
                                </>
                              </h4>
                            )}
                            <div className="wmnds-m-b-sm">
                              {option.validityDays === '1' ? (
                                <span>
                                  {option.ticketCurrentAmount > 0
                                    ? 'This is also a daily fare cap on Swift Go.'
                                    : 'Capped at either a 1 day, 3 day or weekly charge'}
                                </span>
                              ) : (
                                <>
                                  £
                                  {(
                                    option.ticketCurrentAmount / parseInt(option.validityDays, 10)
                                  ).toFixed(2)}{' '}
                                  per day
                                </>
                              )}
                            </div>
                          </div>
                        )}
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
