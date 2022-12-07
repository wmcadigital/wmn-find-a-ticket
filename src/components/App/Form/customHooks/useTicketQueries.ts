/* eslint-disable @typescript-eslint/indent */
import { useMemo } from 'react';
import { useFormContext } from 'globalState';
// import { Ticket } from './Tickets.types';

const useTicketQueries = () => {
  const [formState] = useFormContext();
  const { ticketInfo } = formState;

  const ticketQuery: any = useMemo(() => {
    let fullQuery = {};
    // Hot fix for sandwell & dudley search
    const busArea =
      ticketInfo.busArea === 'Sandwell and Dudley' ? 'Sandwell & Dudley' : ticketInfo.busArea;
    // Prevents filtering by bus result if mode doesn't include bus and has multiple modes selected e.g. train + tram
    const includeBus = ticketInfo.modes!.includes('bus') || ticketInfo.modes!.length === 1;
    const modesQuery = {
      ...(includeBus && { allowBus: ticketInfo.modes!.includes('bus') }),
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

    // If bus company is null or 'nBus' match id for all operators
    const operatorQuery = {
      operator:
        ticketInfo.busCompany && ticketInfo.busCompany !== 'nBus' ? ticketInfo.busCompany : null,
      operatorId:
        !ticketInfo.busCompany || ticketInfo.busCompany === 'nBus'
          ? '74ab7f8a-7c80-e411-9265-0050568f6584'
          : null,
    };

    // INCLUDES BUS ONLY
    const busTravelQuery = {
      busTravelArea: ticketInfo.busArea === 'Diamond Bus Area' ? 'Entire Operator Area' : busArea,
    };

    const railZonesQuery = {
      railZoneFrom: (ticketInfo.railZones && Math.min(...ticketInfo.railZones)) || null,
      railZoneTo: (ticketInfo.railZones && Math.max(...ticketInfo.railZones)) || null,
    };

    const trainQuery = {
      networkTicket: ticketInfo.ticketType === 'nTicket',
      firstClass: ticketInfo.firstClass ? ticketInfo.firstClass === 'yes' : null,
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
      timePeriod3: ticketInfo.travelTime !== 'concessionary' && null, // if travelTime is not concessionary ignore this filter.
      timePeriod4: ticketInfo.travelTime !== 'concessionary',
    };

    fullQuery = { ...modesQuery, ...travellerQuery };

    if (ticketInfo.modes?.includes('bus')) {
      fullQuery = { ...fullQuery, ...busTravelQuery, ...operatorQuery };
    }

    if (ticketInfo.modes?.includes('train')) {
      fullQuery = { ...fullQuery, ...railZonesQuery, ...trainQuery };
    }

    if (ticketInfo.modes?.includes('tram')) {
      fullQuery = { ...fullQuery, ...railZonesQuery };
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
      railZonesQuery,
      trainQuery,
      travelTimeQuery,
    };
  }, [ticketInfo]);

  return ticketQuery;
};

export default useTicketQueries;
