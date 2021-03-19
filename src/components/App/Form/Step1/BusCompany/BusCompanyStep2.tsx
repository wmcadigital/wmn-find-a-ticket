import React from 'react';
import Button from '../../../../shared/Button/Button';

const BusCompanyStep2 = () => {
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <h2>Which bus company do you want to travel with?</h2>
      <p>Dropdown</p>
      <div className="wmnds-p-b-lg">
        <Button btnClass="wmnds-btn--link" text="I don't know the bus company I travel with" />
      </div>
      <Button text="Continue" />
    </div>
  );
};

export default BusCompanyStep2;
