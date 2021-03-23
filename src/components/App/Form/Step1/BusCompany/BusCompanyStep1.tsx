import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep1 = () => {
  const name = 'busNetwork';
  const { formDispatch, handleChange, value, error, setError } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  const handleContinue = () => {
    if (value) {
      formDispatch({ type: 'UPDATE_TICKET_TYPE', payload: value === 'yes' ? 'nBus' : 'single' });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name={name}
        question={question}
        hint={hint}
        radios={options}
        error={error}
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
