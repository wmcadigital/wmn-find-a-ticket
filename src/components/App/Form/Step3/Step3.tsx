import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import TicketClass from './TicketClass/TicketClass';
import TicketDuration from './TicketDuration/TicketDuration';

const Step3 = () => {
  const [formState] = useContext(FormContext);
  let sectionToRender;
  if (
    formState.modes.includes('train') &&
    !formState.ticketInfo.firstClass &&
    Math.max(formState.railZones) <= 5
  ) {
    <TicketClass />;
  }
  return sectionToRender || <TicketDuration />;
};

export default Step3;
