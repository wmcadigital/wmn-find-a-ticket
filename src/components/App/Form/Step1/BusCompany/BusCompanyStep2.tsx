import React from 'react';
import Button from '../../../../shared/Button/Button';
import Dropdown from '../../../../shared/Dropdown/Dropdown';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep2 = () => {
  const { formDispatch, handleChange, value } = useHandleChange();
  const name = 'busCompany';
  const { question, hint, options } = questions[name];

  const handleContinue = () => {
    if (value) {
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
    }
  };

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Dropdown
        label={question}
        hint={hint}
        name={name}
        options={options}
        onChange={handleChange}
      />
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know the bus company I travel with" />
      </div>
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default BusCompanyStep2;
