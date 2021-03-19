import React, { useContext } from 'react';
import { FormContext } from '../../../../../globalState';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';

const Traveller = () => {
  const [formState] = useContext(FormContext);
  const radioOptions = [
    { name: 'traveller', text: 'Adult', value: 'adult' },
    { name: 'traveller', text: 'Young person (5-18)', value: 'youngPerson' },
    { name: 'traveller', text: 'Student (16+)', value: 'student' },
    { name: 'traveller', text: 'Group or Family', value: 'group' },
    { name: 'traveller', text: 'Older person', value: 'senior' },
    { name: 'traveller', text: 'Disabled person', value: 'disabled' },
  ];
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      {formState.ticketInfo.traveller}
      <Radios name="traveller" label="Who will be travelling?" radios={radioOptions} />
      <Button text="Continue" />
    </div>
  );
};

export default Traveller;
