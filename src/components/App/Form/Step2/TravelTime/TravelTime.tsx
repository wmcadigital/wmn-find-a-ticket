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
  const [{ ticketInfo }, formDispatch] = useFormContext();
  const { filterResults } = useTicketFilter();
  const { traveller, travelTime } = ticketInfo;
  const name = 'travelTime';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];
  // eslint-disable-next-line prettier/prettier
  const { modesQuery, travellerQuery, operatorQuery, busTravelQuery, railZonesQuery, tramZonesQuery, trainQuery } =
    useTicketQueries();
  let ticketQuery = { ...travellerQuery };
  if (ticketInfo.modes?.includes('bus')) {
    ticketQuery = { ...travellerQuery, ...busTravelQuery, ...operatorQuery };
  }
  if (ticketInfo.modes?.includes('train')) {
    ticketQuery = { ...modesQuery, ...travellerQuery, ...railZonesQuery, ...trainQuery };
  }
  if (ticketInfo.modes?.includes('tram')) {
    ticketQuery = { ...modesQuery, ...travellerQuery, ...tramZonesQuery, ...trainQuery };
  }
  useEffect(() => {
    if ((traveller === 'concessionary' || traveller === 'disabled') && !travelTime) {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: { name: 'travelTime', value: 'concessionary', autoAnswered: true },
      });
    }
  }, [traveller, travelTime, formDispatch]);

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
