import React from 'react';
import dompurify from 'dompurify';
// Import components
import Radio from './Radio/Radio';
import RadioProps from './Radio/RadioProps';

import s from './Radios.module.scss';

const { sanitize } = dompurify;

interface RadiosProps {
  name: string;
  hint?: string;
  question: string;
  error?: { message: string } | null;
  radios: RadioProps[];
  onChange?: any;
}

const Radios = ({ name, hint, question, error, radios, onChange }: RadiosProps) => {
  return (
    <div className="wmnds-fe-group wmnds-m-b-md">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{question}</h2>
          {hint && <p className={s.hint}>{hint}</p>}
        </legend>
        <div className={`wmnds-fe-radios${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          {/* Loop through radios and display each radio button */}
          {radios.map(({ text, html, value, info }: RadioProps) => (
            <Radio
              key={text}
              name={name}
              text={html || text}
              value={value}
              onChange={onChange}
              info={info}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.defaultProps = {
  onChange: null,
  error: null,
  hint: null,
};

export default Radios;
