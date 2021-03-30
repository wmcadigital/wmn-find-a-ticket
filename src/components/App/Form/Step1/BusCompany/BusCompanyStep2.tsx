import React from 'react';
import Button from '../../../../shared/Button/Button';
import Dropdown from '../../../../shared/Dropdown/Dropdown';
import QuestionCard from '../../../../shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Dropdown
          label={question}
          hint={hint}
          name={name}
          error={error}
          options={options}
          onChange={handleChange}
        />
        <div className="wmnds-p-b-lg">
          <Button btnClass="wmnds-btn--link" text="I don't know the bus company I travel with" />
        </div>
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep2;
