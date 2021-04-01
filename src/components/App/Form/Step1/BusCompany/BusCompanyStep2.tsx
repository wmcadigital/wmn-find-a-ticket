import React, { useContext } from 'react';
import Button from '../../../../shared/Button/Button';
import Dropdown from '../../../../shared/Dropdown/Dropdown';
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
      <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
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
        <Button text="Continue" onClick={handleContinue} />
      </div>
    </>
  );
};

export default BusCompanyStep2;
