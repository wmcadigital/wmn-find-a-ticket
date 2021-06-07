import { useEffect } from 'react';
import { useFormContext } from 'globalState';
import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketQueries from '../../customHooks/useTicketQueries';
import useTicketFilter from '../../customHooks/useTicketFilter';
import getUniqueOptions from '../../helpers/getUniqueOptions';

const TravelTime = () => {
  const [formState, formDispatch] = useFormContext();
  const { filterResults } = useTicketFilter();
  const { ticketInfo } = formState;
  const name = 'travelTime';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];
  // eslint-disable-next-line prettier/prettier
  const { travellerQuery, operatorQuery, busTravelQuery, railZonesQuery, trainQuery } =
    useTicketQueries();
  let ticketQuery;
  if (ticketInfo.modes?.includes('bus')) {
    ticketQuery = { ...travellerQuery, ...busTravelQuery, ...operatorQuery };
  }
  if (ticketInfo.modes?.includes('train')) {
    ticketQuery = { ...travellerQuery, ...railZonesQuery, ...trainQuery };
  }

  const uniqueOptions = getUniqueOptions(filterResults(ticketQuery), [
    'timePeriod1',
    'timePeriod2',
    'timePeriod3',
    'timePeriod4',
  ]);

  const peak = uniqueOptions.includes('true+true+true+true');
  const offpeak = uniqueOptions.includes('false+true+true+true');
  const concessionary =
    uniqueOptions.includes('true+false+false+true') ||
    uniqueOptions.includes('true+false+false+false');

  const optionsToShow = options.filter((option) => {
    return (
      (option.value === 'peak' && peak) ||
      (option.value === 'offpeak' && offpeak) ||
      (option.value === 'concessionary' && concessionary)
    );
  });

  // If there is only one option available, set value to that option and skip step
  useEffect(() => {
    if (optionsToShow && optionsToShow.length === 1) {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: { name, value: optionsToShow[0].value, autoAnswered: true },
      });
    }
  }, [optionsToShow, formDispatch]);

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Radios
          name={name}
          question={question}
          error={error}
          hint={hint}
          radios={optionsToShow}
          onChange={handleChange}
        />
      </QuestionCard>
    </>
  );
};

export default TravelTime;
