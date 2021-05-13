/* eslint-disable @typescript-eslint/indent */
import { useFormContext } from 'globalState';
// import { Ticket } from './Tickets.types';

const useTicketFilter = () => {
  const [formState] = useFormContext();
  const { apiResults } = formState;

  const filterResults = (query: any) => {
    return apiResults.filter((result: any) => {
      // check if each result value matches the equivalent query value
      const valuesMatch = () => {
        let test = true;
        // loop through each query key
        Object.keys(query).forEach((key) => {
          let isMatch = result[key] === query[key];
          if (query[key] === null || (query[key] === undefined && test)) {
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
  };

  return { filterResults };
};

export default useTicketFilter;
