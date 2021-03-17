import React, { useContext } from 'react';
// Contexts
import { FormContext } from '../../../globalState';
import Button from '../../shared/Button/Button';
import SidebarSummary from './SidebarSummary/SidebarSummary';

function Form() {
  const [formState] = useContext(FormContext);
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg">
      <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
        <div className="wmnds-col-2-3">
          <form className="bg-white wmnds-p-lg wmnds-m-b-lg">
            {formState.route}
            <Button text="Continue" />
          </form>
        </div>
        <div className="wmnds-col-1-3">
          <SidebarSummary />
        </div>
      </div>
    </div>
  );
}

export default Form;
