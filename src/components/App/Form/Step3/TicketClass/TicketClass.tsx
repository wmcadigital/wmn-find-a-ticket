import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const TicketClass = () => {
  const name = 'firstClass';
  const { handleChange, handleContinue } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name={name}
        question={question}
        hint={hint}
        radios={options}
        onChange={handleChange}
      />
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default TicketClass;
