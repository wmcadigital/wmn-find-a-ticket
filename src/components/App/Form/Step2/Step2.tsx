import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import BusArea from './BusArea/BusArea';
import RailZone from './RailZone/RailZone';
import TravelTime from './TravelTime/TravelTime';

const Step2 = () => {
  const [formState] = useContext(FormContext);
  const { editMode } = formState;
  let sectionToRender;
  // Logic to determine which to section to show
  if (
    (formState.ticketInfo.ticketType === 'nBus' && !formState.ticketInfo.busArea) ||
    editMode === 'busArea'
  ) {
    sectionToRender = <BusArea />;
  } else if (
    (formState.ticketInfo.ticketType === 'nTicket' && !formState.ticketInfo.railZones) ||
    editMode === 'railZones'
  ) {
    sectionToRender = <RailZone />;
  }

  return <>{sectionToRender || <TravelTime />}</>;
};

export default Step2;
