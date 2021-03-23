import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const Traveller = () => {
  const { formDispatch, handleChange, value } = useHandleChange();
  const name = 'traveller';
  const { question, options } = questions[name];

  const handleContinue = () => {
    if (value) {
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
    }
  };

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios name="traveller" question={question} radios={options} onChange={handleChange} />
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default Traveller;
