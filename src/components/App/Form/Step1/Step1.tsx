import React from 'react';
import Traveller from './Traveller/Traveller';
import BusCompany from './BusCompany/BusCompany';
import useStepLogic from '../customHooks/useStepLogic';

const Step1 = () => {
  const { formState } = useStepLogic();
  const { editMode, ticketInfo } = formState;
  // showBusCompany returns boolean based on if:
  // - modes include bus and not train
  // - ticketType is not set to nBus
  // - busCompany is not set
  let showBusCompany =
    ticketInfo.modes.includes('bus') &&
    !ticketInfo.modes.includes('train') &&
    ticketInfo.ticketType !== 'nBus' &&
    !ticketInfo.busCompany;
  // Set showBusCompany true if edit mode is set and not set to traveller
  if (editMode && ticketInfo.modes.includes('bus') && editMode !== 'traveller') {
    showBusCompany = true;
  }
  return showBusCompany ? <BusCompany /> : <Traveller />;
};

export default Step1;
