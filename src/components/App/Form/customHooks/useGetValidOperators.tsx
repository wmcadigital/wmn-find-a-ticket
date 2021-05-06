import { Ticket } from './Tickets.types';

// START OF HELPER FUNC

// Does all the heavy lifting of getting unique bus operators and returning them back in an array
const getUniqueBusOperators = (tickets: Ticket[]) => {
  const arrayOfUniqueBusOperators: string[] = []; // We use this array to keep track of all unique operators

  const allBusOperators = tickets.map((ticket) => ticket.operator);
  allBusOperators.forEach((operator) => {
    if (!arrayOfUniqueBusOperators.includes(operator)) {
      arrayOfUniqueBusOperators.push(operator);
    }
  });

  return arrayOfUniqueBusOperators;
};

// Get valid bus operators for users chosen filters
const useGetValidBusOperators = (tickets: Ticket[] | null) => {
  // If no tickets found then return a blank array for regional and local operators as we have nothing to check on
  if (!tickets) return [];

  // Otherwise...
  const validBusOperators = getUniqueBusOperators(tickets);

  return validBusOperators;
};

export default useGetValidBusOperators;
