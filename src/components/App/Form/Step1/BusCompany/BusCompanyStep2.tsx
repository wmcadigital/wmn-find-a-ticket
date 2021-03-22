import React from 'react';
import Button from '../../../../shared/Button/Button';
import Dropdown from '../../../../shared/Dropdown/Dropdown';

const BusCompanyStep2 = () => {
  const dropdownOptions = [
    {
      text: 'National Express West Midlands',
      value: 'NXWM',
    },
  ];

  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <Dropdown
        label="Which bus company do you want to travel with?"
        hint="Please choose a company"
        name="busCompany"
        options={dropdownOptions}
      />
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know the bus company I travel with" />
      </div>
      <Button text="Continue" />
    </div>
  );
};

export default BusCompanyStep2;
