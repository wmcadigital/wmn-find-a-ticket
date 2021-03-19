import React, { useContext } from 'react';
import BusCompanyStep1 from './BusCompanyStep1';
import BusCompanyStep2 from './BusCompanyStep2';
import { FormContext } from '../../../../../globalState';

const BusOperator = () => {
  const [formState] = useContext(FormContext);

  return !formState.ticketInfo.ticketType ? <BusCompanyStep1 /> : <BusCompanyStep2 />;
};

export default BusOperator;
