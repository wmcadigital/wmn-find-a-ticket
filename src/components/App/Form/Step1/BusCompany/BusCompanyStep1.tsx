import React, { useState, useContext } from 'react';
import { FormContext } from '../../../../../globalState';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';

const BusCompanyStep1 = () => {
  const [, formDispatch] = useContext(FormContext);
  const [state, setState] = useState('');
  const name = 'busNetwork';
  const { question, hint, options } = questions[name];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleContinue = () => {
    formDispatch({ type: 'UPDATE_TICKET_TYPE', payload: state === 'yes' ? 'nBus' : 'single' });
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
