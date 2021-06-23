import { useFormContext } from 'globalState';
import TicketClass from './TicketClass/TicketClass';
import TicketDuration from './TicketDuration/TicketDuration';
import TicketBundle from './TicketBundle/TicketBundle';
import useTicketQueries from '../customHooks/useTicketQueries';
import useTicketFilter from '../customHooks/useTicketFilter';

const Step3 = () => {
  const [formState] = useFormContext();
  const { fullQuery } = useTicketQueries();
  const { filterResults } = useTicketFilter();
  const filteredResults = filterResults(fullQuery);

  const { ticketInfo, editMode } = formState;
  let sectionToRender;
  const hasBundleTickets = filteredResults.some((result) => result.type === 'Carnet');
  const hasFirstClassOptions =
    filteredResults.some((result) => result.firstClass) &&
    filteredResults.some((result) => !result.firstClass);

  if (ticketInfo.railZones) {
    // Logic to determine which to section to show
    if (
      (ticketInfo.ticketType === 'nTicket' && !ticketInfo.firstClass && hasFirstClassOptions) ||
      editMode === 'firstClass'
    ) {
      sectionToRender = <TicketClass />;
    }
  } else if (
    !editMode &&
    ticketInfo.modes!.includes('bus') &&
    hasBundleTickets &&
    ticketInfo.ticketDuration === '1 day'
  ) {
    sectionToRender = <TicketBundle results={filteredResults} />;
  }
  return (
    sectionToRender || (
      <TicketDuration
        results={filteredResults.filter((result) => result.type !== 'Carnet')}
        hasBundleTickets={hasBundleTickets}
      />
    )
  );
};

export default Step3;
