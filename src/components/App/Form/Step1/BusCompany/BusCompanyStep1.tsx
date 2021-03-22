import React, { useState, useContext } from 'react';
import { FormContext } from '../../../../../globalState';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';

const Step1 = () => {
  const [, formDispatch] = useContext(FormContext);
  const [state, setState] = useState('');
  const radioOptions = [
    { name: 'busNetwork', text: 'Yes', value: 'yes' },
    { name: 'busNetwork', text: 'No', value: 'no' },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleContinue = () => {
    formDispatch({ type: 'UPDATE_TICKET_TYPE', payload: state === 'yes' ? 'nBus' : 'single' });
  };
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name="busNetwork"
        hint="Travel on any bus company in the West Midlands Network"
        label="Do you want to travel on any bus?"
        radios={radioOptions}
        onChange={handleChange}
      />
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know which bus I need" />
      </div>
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default Step1;
