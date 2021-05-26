import { Ticket } from '../types/Tickets.types';

// START OF HELPER FUNC

// Does all the heavy lifting of getting unique bus operators and returning them back in an array
const getUniqueOptions = (tickets: Ticket[], optionNames: (keyof Ticket)[]) => {
  const arrayOfUniqueOptions: string[] = []; // We use this array to keep track of all unique operators

  const allOptions = tickets
    .filter((ticket) => {
      let optionsDefined = true;
      optionNames.forEach((optionName) => {
        optionsDefined = !ticket[optionName];
      });
      return !optionsDefined;
    })
    .map((ticket) => {
      const optionArr: any[] = [];
      optionNames.forEach((optionName) => {
        optionArr.push(ticket[optionName]);
      });
      return optionArr;
    });

  allOptions.forEach((option: any[]) => {
    const optionAsString = option.join('+');
    if (!arrayOfUniqueOptions.includes(`${optionAsString}`)) {
      arrayOfUniqueOptions.push(`${optionAsString}`);
    }
  });

  return arrayOfUniqueOptions;
};

export default getUniqueOptions;
