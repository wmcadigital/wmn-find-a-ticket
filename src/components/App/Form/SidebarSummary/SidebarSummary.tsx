import React, { useContext } from 'react';
import Button from '../../../shared/Button/Button';
import { FormContext } from '../../../../globalState';

function SidebarSummary() {
  const [formState] = useContext(FormContext);

  const capitalizedModes = formState.modes.map(
    (m: string) => `${m.charAt(0).toUpperCase()}${m.slice(1)}`,
  );
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

  return (
    <div className="bg-white wmnds-p-md">
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xsm">
        <strong className="wmnds-col-2-3">Mode of travel</strong>
        <div className="wmnds-col-1-3 wmnds-text-align-right">
          <Button text="Change" btnClass="wmnds-btn--link" />
        </div>
      </div>
      <div>{arrayToSentence(capitalizedModes)}</div>
    </div>
  );
}

export default SidebarSummary;
