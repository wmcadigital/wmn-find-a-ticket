import { useFormContext } from 'globalState';
import BusArea from './BusArea/BusArea';
import RailZone from './RailZone/RailZone';
import TramZone from './TramZone/TramZone';
import TravelTime from './TravelTime/TravelTime';

const Step2 = () => {
  const [formState] = useFormContext();
  const { editMode } = formState;
  let sectionToRender;
  // Logic to determine which to section to show
  if (
    (formState.ticketInfo.ticketType === 'nBus' && !formState.ticketInfo.busArea) ||
    (formState.ticketInfo.ticketType === 'single' && !formState.ticketInfo.busArea) ||
    editMode === 'busArea'
  ) {
    sectionToRender = <BusArea />;
  } else if (
    (formState.ticketInfo.ticketType === 'nTicket' && !formState.ticketInfo.railZones) ||
    editMode === 'railZones'
  ) {
    sectionToRender = <RailZone />;
  } else if (
    (formState.ticketInfo.ticketType === 'tram' && formState.ticketInfo.modes?.includes('tram')) ||
    editMode === 'modes'
  ) {
    sectionToRender = <TramZone />;
  }
  return <>{sectionToRender || <TravelTime />}</>;
};

export default Step2;
