import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';

const Traveller = () => {
  const name = 'traveller';
  const { question, options } = questions[name];
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios name="traveller" question={question} radios={options} />
      <Button text="Continue" />
    </div>
  );
};

export default Traveller;
