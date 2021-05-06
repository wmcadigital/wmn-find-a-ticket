import { useFormContext } from 'globalState';

const useTicketFilter = () => {
  const [formState] = useFormContext();
  // const ticketFilter: any = useMemo(() => {
  //   let query = {
  //     allowBus: ticketInfo.modes!.includes('bus'),
  //     allowMetro: ticketInfo.modes!.includes('tram'),
  //     allowTrain: ticketInfo.modes!.includes('train'),
  //     allowPeakTravel: ticketInfo.travelTime === 'peak' || ticketInfo.travelTime === 'senior',
  //     // passengerType: ticketInfo.traveller,
  //     isAdult: ticketInfo.traveller === 'adult',
  //     isChild: ticketInfo.traveller === 'youngPerson',
  //     isStudent: ticketInfo.traveller === 'student',
  //     isConcessionary: ticketInfo.traveller === 'concessionary',
  //     isFamily: ticketInfo.traveller === 'family',
  //     timePeriod1: ticketInfo.travelTime === 'peak' || ticketInfo.travelTime === 'senior',
  //     timePeriod2: ticketInfo.travelTime !== 'senior',
  //     timePeriod3: ticketInfo.travelTime !== 'senior',
  //     timePeriod4: ticketInfo.travelTime !== 'senior',
  //   };

  //   // INCLUDES BUS ONLY
  //   const busQuery = {
  //     busTravelArea: ticketInfo.busArea,
  //     operator: ticketInfo.busCompany || 'Network West Midlands',
  //   };

  //   const trainQuery = {
  //     firstClass: ticketInfo.firstClass === 'yes',
  //     networkTicket: ticketInfo.ticketType === 'nTicket',
  //     railZoneFrom: (ticketInfo.railZones && Math.min(...ticketInfo.railZones)) || null,
  //     railZoneTo:
  //       (!ticketInfo.outOfCounty && ticketInfo.railZones && Math.max(...ticketInfo.railZones)) ||
  //       null,
  //     outOfCounty: ticketInfo.outOfCounty,
  //   };

  //   if (ticketInfo.modes?.includes('bus')) {
  //     query = { ...query, ...busQuery };
  //   }

  //   if (ticketInfo.modes?.includes('train')) {
  //     query = { ...query, ...trainQuery };
  //   }

  //   return query;
  // }, [ticketInfo]);

  //     console.log({ ticketFilter });
  //     setLoading(false); // Set loading state to false after data is received

  //     const filteredResults = response.data.filter((result: any) => {
  //       // check if each result value matches the equivalent query value
  //       const valuesMatch = () => {
  //         // console.log(`%c${result.name}`, 'font-weight: bold');
  //         let test = true;
  //         // loop through each query key
  //         Object.keys(ticketFilter).forEach((key) => {
  //           let isMatch = result[key] === ticketFilter[key];
  //           if (ticketFilter[key] === null || (ticketFilter[key] === undefined && test)) {
  //             isMatch = true;
  //           }
  //           if (isMatch === false) {
  //             console.log(isMatch);
  //             // console.log(`R: '${result[key]}',`, `Q: '${ticketFilter[key]}',`, `name: ${key}`);
  //             test = false; // fail test if values don't match
  //           }
  //         });
  //         return test;
  //       };

  //       return valuesMatch();
  //     });
  //     console.log(filteredResults);

  //     if (!filteredResults.length && mounted.current) {
  //       setErrorInfo({
  //         title: 'No results found',
  //         message: 'Make sure you are looking for the right service, and try again.',
  //       });
  //     }
  return formState;
};

export default useTicketFilter;
