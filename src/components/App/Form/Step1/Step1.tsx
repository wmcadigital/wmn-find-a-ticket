import React from 'react';
import Traveller from './Traveller/Traveller';
import BusCompany from './BusCompany/BusCompany';
import useStepLogic from '../customHooks/useStepLogic';

const Step1 = () => {
  const { formState } = useStepLogic();
  const { modes, editMode, ticketInfo } = formState;
  // showBusCompany returns boolean based on if:
  // - modes include bus and not train
  // - ticketType is not set to nBus
  // - busCompany is not set
  let showBusCompany =
    modes.includes('bus') &&
    !modes.includes('train') &&
    ticketInfo.ticketType !== 'nBus' &&
    !ticketInfo.busCompany;
  // Set showBusCompany true if edit mode is set and not set to traveller
  if (editMode && modes.includes('bus') && editMode !== 'traveller') {
    showBusCompany = true;
  }
  return showBusCompany ? <BusCompany /> : <Traveller />;
};

export default Step1;
