import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import Traveller from './Traveller/Traveller';
import BusOperator from './BusOperator/BusOperator';

const Step1 = () => {
  const [formState] = useContext(FormContext);
  const { modes, ticketInfo } = formState;
  return (
    <>
      {modes.includes('bus') && !modes.includes('train') && !ticketInfo.ticketType ? (
        <BusOperator />
      ) : (
        <Traveller />
      )}
    </>
  );
};

export default Step1;
