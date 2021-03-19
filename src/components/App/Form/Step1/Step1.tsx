import React from 'react';
import Traveller from './Traveller/Traveller';
import BusOperator from './BusOperator/BusOperator';
import useStepLogic from '../customHooks/useStepLogic';

const Step1 = () => {
  const { formState } = useStepLogic();
  const { modes, ticketInfo } = formState;
  // const continue = () => {
  //   setTicketType();
  // };

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
