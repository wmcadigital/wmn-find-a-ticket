import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const Traveller = () => {
  const name = 'traveller';
  const { handleChange, handleContinue, error } = useHandleChange(name);
  const { question, options } = questions[name];

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name="traveller"
        question={question}
        radios={options}
        error={error}
        onChange={handleChange}
      />
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default Traveller;
