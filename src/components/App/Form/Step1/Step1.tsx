import React from 'react';
import Traveller from './Traveller/Traveller';
import BusCompany from './BusCompany/BusCompany';
import useStepLogic from '../customHooks/useStepLogic';

const Step1 = () => {
  const { formState } = useStepLogic();
  const { modes, ticketInfo } = formState;
  const showBusCompany =
    modes.includes('bus') &&
    !modes.includes('train') &&
    ticketInfo.ticketType !== 'nBus' &&
    !ticketInfo.busCompany;
  return showBusCompany ? <BusCompany /> : <Traveller />;
};

export default Step1;
