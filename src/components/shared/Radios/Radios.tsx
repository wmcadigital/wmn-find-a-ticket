import React from 'react';
// Import components
import Radio from './Radio/Radio';
import RadioProps from './Radio/RadioProps';

import s from './Radios.module.scss';

interface RadiosProps {
  name: string;
  hint?: string;
  label: string;
  radios: RadioProps[];
  onChange?: any;
}

const Radios = ({ name, hint, label, radios, onChange }: RadiosProps) => {
  return (
    <div className="wmnds-fe-group">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{label}</h2>
          {hint && <p className={s.hint}>{hint}</p>}
          {/* If there is an error, show here */}
          {/* {errors[name] && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(errors[name].message),
              }}
            />
          )} */}
        </legend>
        <div className="wmnds-fe-radios">
          {/* Loop through radios and display each radio button */}
          {radios.map((radio: RadioProps) => (
            <Radio
              key={radio.text}
              name={name}
              text={radio.text}
              value={radio.value}
              onChange={onChange}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.defaultProps = {
  onChange: null,
  hint: null,
};

export default Radios;