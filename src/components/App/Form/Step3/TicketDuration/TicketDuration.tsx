import React from 'react';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const TicketDuration = () => {
  const name = 'ticketDuration';
  const { formDispatch } = useHandleChange(name);
  const { question, hint, options } = questions[name];
  const handleContinue = (value: string) => {
    formDispatch({ type: 'EDIT_MODE', payload: null });
    formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
  };

  return (
    <>
      <div className="bg-white wmnds-p-lg wmnds-m-b-md">
        <h2 className="wmnds-fe-question">{question}</h2>
        <p className="wmnds-m-none">{hint}</p>
      </div>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        {options.map((option: { [key: string]: string }) => (
          <div key={`${name}-${option.value}`} className="wmnds-col-md-1-2">
            <div className="bg-white wmnds-p-md wmnds-m-b-lg">
              <h4>
                {option.text} <span>£{option.totalPrice}</span>
              </h4>
              <p>£{option.dailyPrice} per day</p>
              <Button
                btnClass="wmnds-btn--block"
                text="Select"
                onClick={() => handleContinue(option.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TicketDuration;
