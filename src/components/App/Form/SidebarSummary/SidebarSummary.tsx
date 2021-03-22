import React, { useContext } from 'react';
import Button from '../../../shared/Button/Button';
import { FormContext } from '../../../../globalState';

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

const SummarySection = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xsm">
        <strong className="wmnds-col-2-3">{title}</strong>
        <div className="wmnds-col-1-3 wmnds-text-align-right">
          <Button text="Change" btnClass="wmnds-btn--link" />
        </div>
      </div>
      <div>{value}</div>
    </>
  );
};

const SidebarSummary = () => {
  const [formState] = useContext(FormContext);
  const { ticketInfo } = formState;

  const capitalizedModes = formState.modes.map((m: string) => capitalize(m));

  return (
    <div className="bg-white wmnds-p-md">
      <SummarySection title="Mode of travel" value={arrayToSentence(capitalizedModes)} />
      <hr />
      <SummarySection title="Bus company" value={ticketInfo.busCompany} />
      <hr />
      {ticketInfo.traveller && (
        <>
          <SummarySection title="Traveller" value={capitalize(ticketInfo.traveller)} />
          <hr />
        </>
      )}
      <SummarySection title="Bus area" value="Hello" />
    </div>
  );
};

export default SidebarSummary;
