import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';

const Step1 = () => {
  const radioOptions = [
    { name: 'busNetwork', text: 'Yes', value: 'yes' },
    { name: 'busNetwork', text: 'No', value: 'no' },
  ];
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name="busNetwork"
        hint="Travel on any bus company in the West Midlands Network"
        label="Do you want to travel on any bus?"
        radios={radioOptions}
      />
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know which bus I need" />
      </div>
      <Button text="Continue" />
    </div>
  );
};

export default Step1;
