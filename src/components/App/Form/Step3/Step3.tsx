import { useFormContext } from 'globalState';
import TicketClass from './TicketClass/TicketClass';
import TicketDuration from './TicketDuration/TicketDuration';
import TicketBundle from './TicketBundle/TicketBundle';

const Step3 = () => {
  const [formState] = useFormContext();
  const { ticketInfo, editMode } = formState;
  let sectionToRender;

  if (ticketInfo.railZones) {
    // Logic to determine which to section to show
    if (
      (ticketInfo.ticketType === 'nTicket' &&
        !ticketInfo.firstClass &&
        Math.min(...ticketInfo.railZones!) === 1 &&
        Math.max(...ticketInfo.railZones!) >= 4) ||
      editMode === 'firstClass'
    ) {
      sectionToRender = <TicketClass />;
    }
  } else if (
    !editMode &&
    ticketInfo.modes!.includes('bus') &&
    ticketInfo.ticketDuration === '1 day'
  ) {
    sectionToRender = <TicketBundle />;
  }
  return sectionToRender || <TicketDuration />;
};

export default Step3;
