/* eslint-disable @typescript-eslint/indent */
import { useMemo } from 'react';
import { useFormContext } from 'globalState';
// import { Ticket } from './Tickets.types';

const useTicketFilter = (isBusAreaFilter?: boolean) => {
  const [formState] = useFormContext();
  const { ticketInfo, apiResults } = formState;

  const ticketFilter: any = useMemo(() => {
    let query = {};

    const initialQuery = {
      allowBus: ticketInfo.modes!.includes('bus'),
      allowMetro: ticketInfo.modes!.includes('tram'),
      allowTrain: ticketInfo.modes!.includes('train'),
      isAdult: ticketInfo.traveller === 'adult',
      isChild: ticketInfo.traveller === 'youngPerson',
      isStudent: ticketInfo.traveller === 'student',
      isConcessionary: ticketInfo.traveller === 'concessionary',
      isFamily: ticketInfo.traveller === 'family',
    };

    // If bus company is null or 'nBus' default to 'Network West Midlands' as filter
    const operator =
      ticketInfo.busCompany && ticketInfo.busCompany !== 'nBus'
        ? ticketInfo.busCompany
        : 'Network West Midlands';

    // INCLUDES BUS ONLY
    const busQuery = {
      busTravelArea:
        ticketInfo.busArea === 'Diamond Bus Area' ? 'Entire Operator Area' : ticketInfo.busArea,
      operator,
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
      allowPeakTravel: ticketInfo.travelTime === 'peak' || ticketInfo.travelTime === 'senior',
      timePeriod1: ticketInfo.travelTime === 'peak' || ticketInfo.travelTime === 'senior',
      timePeriod2: ticketInfo.travelTime !== 'senior',
      timePeriod3: ticketInfo.travelTime !== 'senior',
      timePeriod4: ticketInfo.travelTime !== 'senior',
    };

    query = { ...initialQuery };

    if (ticketInfo.modes?.includes('bus')) {
      query = { ...query, ...busQuery };
    }

    if (ticketInfo.modes?.includes('train')) {
      query = { ...query, ...trainQuery };
    }

    if (ticketInfo.travelTime) {
      query = { ...query, ...travelTimeQuery };
    }

    return isBusAreaFilter
      ? {
          ...initialQuery,
          operator,
        }
      : query;
  }, [ticketInfo, isBusAreaFilter]);

  const filteredResults = apiResults.filter((result: any) => {
    // check if each result value matches the equivalent query value
    const valuesMatch = () => {
      let test = true;
      // loop through each query key
      Object.keys(ticketFilter).forEach((key) => {
        let isMatch = result[key] === ticketFilter[key];
        if (ticketFilter[key] === null || (ticketFilter[key] === undefined && test)) {
          isMatch = true;
        }
        if (isMatch === false) {
          test = false; // fail test if values don't match
        }
      });
      return test;
    };

    return valuesMatch();
  });

  return { filteredResults };
};

export default useTicketFilter;
