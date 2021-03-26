import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import TicketClass from './TicketClass/TicketClass';
import TicketDuration from './TicketDuration/TicketDuration';

const Step3 = () => {
  const [formState] = useContext(FormContext);
  const { ticketInfo, editMode } = formState;
  let sectionToRender;
  // Logic to determine which to section to show
  if (
    (ticketInfo.ticketType === 'nTicket' &&
      !ticketInfo.firstClass &&
      Math.max(...ticketInfo.railZones) < 5) ||
    editMode === 'firstClass'
  ) {
    sectionToRender = <TicketClass />;
  }
  return sectionToRender || <TicketDuration />;
};

export default Step3;
