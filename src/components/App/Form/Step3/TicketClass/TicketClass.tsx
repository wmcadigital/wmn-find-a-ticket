import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';

const TicketClass = () => {
  const radioOptions = [
    {
      name: 'firstClass',
      text: 'Yes',
      value: 'yes',
    },
    {
      name: 'firstClass',
      text: 'No',
      value: 'no',
    },
  ];
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name="firstClass"
        label="Do you want to sit in first class?"
        hint="First class is only available on CrossCountry, Avanti West Coast and some London Northwestern trains."
        radios={radioOptions}
      />
      <Button text="Continue" />
    </div>
  );
};

export default TicketClass;
