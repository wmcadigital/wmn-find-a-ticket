/* eslint-disable @typescript-eslint/indent */
import { useMemo } from 'react';
import { useFormContext } from 'globalState';
// import { Ticket } from './Tickets.types';

const useTicketFilter = () => {
  const [formState] = useFormContext();
  const { ticketInfo } = formState;

  const ticketFilter: any = useMemo(() => {
    let fullQuery = {};

    const modesQuery = {
      allowBus: ticketInfo.modes!.includes('bus'),
      allowMetro: ticketInfo.modes!.includes('tram'),
      allowTrain: ticketInfo.modes!.includes('train'),
    };

    const travellerQuery = {
      isAdult: ticketInfo.traveller === 'adult',
      isChild: ticketInfo.traveller === 'youngPerson',
      isStudent: ticketInfo.traveller === 'student',
      isConcessionary:
        ticketInfo.traveller === 'concessionary' || ticketInfo.traveller === 'disabled',
      isFamily: ticketInfo.traveller === 'family',
    };

    // If bus company is null or 'nBus' default to 'Network West Midlands' as filter
    const operatorQuery = {
      operator:
        ticketInfo.busCompany && ticketInfo.busCompany !== 'nBus'
          ? ticketInfo.busCompany
          : 'Network West Midlands',
    };

    // INCLUDES BUS ONLY
    const busTravelQuery = {
      busTravelArea:
        ticketInfo.busArea === 'Diamond Bus Area' ? 'Entire Operator Area' : ticketInfo.busArea,
    };

    const trainQuery = {
      firstClass: ticketInfo.firstClass === 'yes',
      networkTicket: ticketInfo.ticketType === 'nTicket',
      railZoneFrom: (ticketInfo.railZones && Math.min(...ticketInfo.railZones)) || null,
      railZoneTo:
        (!ticketInfo.outOfCounty && ticketInfo.railZones && Math.max(...ticketInfo.railZones)) ||
        null,
      outOfCounty: ticketInfo.outOfCounty,
    };

    const travelTimeQuery = {
      allowPeakTravel:
        ticketInfo.travelTime === 'peak' ||
        ticketInfo.travelTime === 'concessionary' ||
        ticketInfo.travelTime === 'any',
      timePeriod1:
        ticketInfo.travelTime === 'peak' ||
        ticketInfo.travelTime === 'concessionary' ||
        ticketInfo.travelTime === 'any',
      timePeriod2: ticketInfo.travelTime !== 'concessionary',
      timePeriod3: ticketInfo.travelTime !== 'concessionary',
      timePeriod4: ticketInfo.travelTime !== 'concessionary',
    };

    fullQuery = { ...modesQuery, ...travellerQuery };

    if (ticketInfo.modes?.includes('bus')) {
      fullQuery = { ...fullQuery, ...busTravelQuery, ...operatorQuery };
    }

    if (ticketInfo.modes?.includes('train')) {
      fullQuery = { ...fullQuery, ...trainQuery };
    }

    if (ticketInfo.travelTime) {
      fullQuery = { ...fullQuery, ...travelTimeQuery };
    }

    return {
      fullQuery,
      modesQuery,
      travellerQuery,
      operatorQuery,
      busTravelQuery,
      trainQuery,
      travelTimeQuery,
    };
  }, [ticketInfo]);

  return ticketFilter;
};

export default useTicketFilter;
