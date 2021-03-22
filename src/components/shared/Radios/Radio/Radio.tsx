/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import dompurify from 'dompurify';

// Import contexts
import { FormContext } from '../../../../globalState';
import RadioProps from './RadioProps';

const { sanitize } = dompurify;

const Radio = ({ name = '', onChange, text, value }: RadioProps) => {
  const [formState] = useContext(FormContext); // Get the state/dispatch of form data from FormContext

  return (
    <>
      <label className="wmnds-fe-radios__container">
        <div dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
        <input
          className="wmnds-fe-radios__input"
          value={value}
          name={name}
          type="radio"
          onChange={onChange}
          defaultChecked={formState.ticketInfo[name] && formState.ticketInfo[name] === value}
        />
        <span className="wmnds-fe-radios__checkmark" />
      </label>
    </>
  );
};

Radio.defaultProps = {
  name: '',
  onChange: null,
};

export default Radio;
