import React from 'react';
import Button from '../../../../shared/Button/Button';

const TicketDuration = () => {
  const options = [
    {
      duration: '1 week',
      totalPrice: '25.90',
      dailyPrice: '3.70',
    },
    {
      duration: '28 days',
      totalPrice: '87.50',
      dailyPrice: '3.12',
    },
    {
      duration: 'Monthly Direct Debit',
      totalPrice: '70.20',
      dailyPrice: '2.34',
    },
    {
      duration: '52 weeks',
      totalPrice: '843.00',
      dailyPrice: '2.32',
    },
  ];
  return (
    <>
      <div className="bg-white wmnds-p-lg wmnds-m-b-md">
        <h2 className="wmnds-fe-question">How long do you need your ticket to last?</h2>
        <p className="wmnds-m-none">Select the ticket duration below.</p>
      </div>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        {options.map(({ duration, totalPrice, dailyPrice }) => (
          <div className="wmnds-col-md-1-2">
            <div className="bg-white wmnds-p-md wmnds-m-b-lg">
              <h4>
                {duration} <span>£{totalPrice}</span>
              </h4>
              <p>£{dailyPrice} per day</p>
              <Button btnClass="wmnds-btn--block" text="Select" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TicketDuration;
