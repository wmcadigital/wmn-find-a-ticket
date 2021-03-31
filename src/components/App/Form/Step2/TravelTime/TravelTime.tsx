import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import QuestionCard from '../../../../shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const TravelTime = () => {
  const name = 'travelTime';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Radios
          name={name}
          question={question}
          error={error}
          hint={hint}
          radios={options}
          onChange={handleChange}
        />
      </QuestionCard>
    </>
  );
};

export default TravelTime;
