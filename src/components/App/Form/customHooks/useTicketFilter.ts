import { useFormContext } from 'globalState';

const useTicketFilter = () => {
  const [formState] = useFormContext();
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
