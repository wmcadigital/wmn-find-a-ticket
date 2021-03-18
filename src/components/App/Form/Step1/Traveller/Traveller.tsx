import React, { useContext } from 'react';
import { FormContext } from '../../../../../globalState';

const Traveller = () => {
  const [formState] = useContext(FormContext);
  return (
    <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
      <h2 className="wmnds-fe-question">Who will be travelling?</h2>
      {formState.ticketInfo.traveller}
    </div>
  );
};

export default Traveller;
