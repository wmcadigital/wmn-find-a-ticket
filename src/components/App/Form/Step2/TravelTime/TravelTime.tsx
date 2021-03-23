import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const TravelTime = () => {
  const name = 'travelTime';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  return (
    <>
      {genericError}
      <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
        <Radios
          name={name}
          question={question}
          error={error}
          hint={hint}
          radios={options}
          onChange={handleChange}
        />
        <Button text="Continue" onClick={handleContinue} />
      </div>
    </>
  );
};

export default TravelTime;
