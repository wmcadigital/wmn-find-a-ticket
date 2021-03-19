import React from 'react';
import Radios from '../../../../shared/Radios/Radios';
import Button from '../../../../shared/Button/Button';

const TravelTime = () => {
  const radioOptions = [
    {
      name: 'travelTime',
      text: '<strong>Peak</strong><br>I need to travel before 9.30am',
      value: 'peak',
    },
    {
      name: 'travelTime',
      text: '<strong>Off-peak</strong><br>I will only travel after 9.30am',
      value: 'offpeak',
    },
    {
      name: 'travelTime',
      text:
        '<strong>Disabled or Older Person’s pass holder</strong><br>I need to travel before 9.30am ',
      value: 'senior',
    },
  ];
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Radios
        name="travelTime"
        label="Will you travel during peak hours?"
        hint="Sometimes you can get a cheaper ticket if you only travel after 9.30am. "
        radios={radioOptions}
      />
      <Button text="Continue" />
    </div>
  );
};

export default TravelTime;
