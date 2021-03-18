import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import TicketClass from './TicketClass/TicketClass';
import TicketDuration from './TicketDuration/TicketDuration';

const Step3 = () => {
  const [formState] = useContext(FormContext);
  return (
    <>
      {formState.modes.includes('train') && !formState.ticketInfo.ticketClass ? (
        <TicketClass />
      ) : (
        <TicketDuration />
      )}
    </>
  );
};

export default Step3;
