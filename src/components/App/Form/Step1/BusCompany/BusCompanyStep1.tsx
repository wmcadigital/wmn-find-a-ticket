import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep1 = () => {
  const { formDispatch, handleChange, value } = useHandleChange();
  const name = 'busNetwork';
  const { question, hint, options } = questions[name];

  const handleContinue = () => {
    formDispatch({ type: 'UPDATE_TICKET_TYPE', payload: value === 'yes' ? 'nBus' : 'single' });
  };

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name={name}
        question={question}
        hint={hint}
        radios={options}
        onChange={handleChange}
      />
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know which bus I need" />
      </div>
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default BusCompanyStep1;
