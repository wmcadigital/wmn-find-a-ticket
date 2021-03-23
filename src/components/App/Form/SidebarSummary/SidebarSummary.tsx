import React, { useContext } from 'react';
import { FormContext } from '../../../../globalState';
import questions from '../questions';
import SummarySection from './SummarySection';

// helpers
const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const arrayToSentence = (array: string[]) => {
  let sentence;
  if (array.length > 2) {
    sentence = `${array.slice(0, array.length - 1).join(', ')} and ${array.slice(-1)}`;
  } else if (array.length === 2) {
    sentence = `${array[0]} and ${array[1]}`;
  } else {
    [sentence] = array;
  }
  return sentence;
};

const SidebarSummary = () => {
  const [formState] = useContext(FormContext);
  const { ticketInfo } = formState;

  const capitalizedModes = formState.modes.map((m: string) => capitalize(m));

  const getOptionText = (key: string, val: string) => {
    const o = questions[key].options.find(
      (option: any) => option.value.toLowerCase() === val.toLowerCase(),
    );
    return o && o.text;
  };

  return (
    <div className="bg-white wmnds-p-md">
      <SummarySection title="Mode of travel" value={arrayToSentence(capitalizedModes)} />
      {ticketInfo.busCompany && (
        <>
          <SummarySection
            title="Bus company"
            value={getOptionText('busCompany', ticketInfo.busCompany)}
          />
        </>
      )}
      {ticketInfo.traveller && (
        <>
          <SummarySection
            title="Traveller"
            value={getOptionText('traveller', ticketInfo.traveller)}
          />
        </>
      )}
      {ticketInfo.busAreas && (
        <>
          <SummarySection title="Bus area" value={getOptionText('busAreas', ticketInfo.busAreas)} />
        </>
      )}
      {ticketInfo.travelTime && (
        <>
          <SummarySection
            title="Travel time"
            value={getOptionText('travelTime', ticketInfo.travelTime)}
          />
        </>
      )}
      {ticketInfo.firstClass && (
        <>
          <SummarySection
            title="First class"
            value={getOptionText('firstClass', ticketInfo.firstClass)}
          />
        </>
      )}
    </div>
  );
};

export default SidebarSummary;
