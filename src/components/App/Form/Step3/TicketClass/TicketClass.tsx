import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';

const TicketClass = () => {
  const name = 'firstClass';
  const { question, hint, options } = questions[name];

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios name={name} question={question} hint={hint} radios={options} />
      <Button text="Continue" />
    </div>
  );
};

export default TicketClass;
