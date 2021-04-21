import { useState, useEffect } from 'react';
import { useFormContext } from 'globalState';
import QuestionCard, { ChangeAnswers } from 'components/shared/QuestionCard/QuestionCard';
import Button from 'components/shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import s from './TicketDuration.module.scss';

const TicketDuration = () => {
  const name = 'ticketDuration';
  const [formState] = useFormContext();
  const { formDispatch } = useHandleChange(name);
  const { question, hint } = questions[name];
  const handleContinue = (value: string) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
  };
  const [options, setOptions] = useState<any[]>([]);
  const { results, loading } = useTicketingAPI('/ticketing/v2/tickets/search');

  useEffect(() => {
    if (results.data) {
      if (formState.ticketInfo.ticketType === 'nBus') {
        setOptions(
          results.data.filter(
            (result: any) => result.busTravelArea === formState.ticketInfo.busArea,
          ),
        );
      } else {
        setOptions(results.data);
      }
    }
    console.log(options);
  }, [results]);

  return (
    <>
      <QuestionCard showChangeBtn={false}>
        <h2 className="wmnds-fe-question">{question}</h2>
        <p className="wmnds-m-none">{hint}</p>
      </QuestionCard>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        {loading ? (
          <div className="wmnds-col-1">
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
          </div>
        ) : (
          <>
            {options.map((option: { [key: string]: string }) => {
              return (
                <div key={option.id} className="wmnds-col-1 wmnds-col-md-1-2">
                  <div className="bg-white wmnds-p-md wmnds-m-b-lg">
                    <h4>
                      {option.name}
                      <span className={s.totalPrice}>
                        £{parseFloat(option.ticketCurrentAmount).toFixed(2)}
                      </span>
                    </h4>
                    <p>£{parseFloat(option.ticketCurrentAmount).toFixed(2)} per day</p>
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
