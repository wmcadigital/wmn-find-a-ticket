import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import BusArea from './BusArea/BusArea';
import RailZone from './RailZone/RailZone';
import TravelTime from './TravelTime/TravelTime';

const Step2 = () => {
  const [formState] = useContext(FormContext);
  let sectionToRender = null;
  if (formState.ticketInfo.ticketType === 'nBus' && !formState.ticketInfo.busArea) {
    sectionToRender = <BusArea />;
  } else if (formState.ticketInfo.ticketType === 'nTicket' && !formState.ticketInfo.railZones) {
    sectionToRender = <RailZone />;
  }

  return <>{sectionToRender || <TravelTime />}</>;
};

export default Step2;
