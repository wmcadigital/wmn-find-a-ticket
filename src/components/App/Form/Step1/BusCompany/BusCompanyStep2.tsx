import React, { useContext } from 'react';
import Button from '../../../../shared/Button/Button';
import Dropdown from '../../../../shared/Dropdown/Dropdown';
import QuestionCard from '../../../../shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import { FormContext } from '../../../../../globalState';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const [formState] = useContext(FormContext);
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
          <a
            className="wmnds-link"
            href={`https://https://find-bus-operator.wmnetwork.co.uk/?modes=${formState.ticketInfo.modes.join(
              '+',
            )}`}
          >
            I don&rsquo;t know the bus company I travel with
          </a>
        </div>
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep2;
