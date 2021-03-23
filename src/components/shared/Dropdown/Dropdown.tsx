import React, { useContext } from 'react';
import dompurify from 'dompurify';

// Import contexts
import { FormContext } from '../../../globalState';

const { sanitize } = dompurify;

interface OptionProps {
  text: string;
  value: string;
}

interface DropdownProps {
  name: string;
  hint: string;
  error?: { message: string } | null;
  label: string;
  options: OptionProps[];
  onChange?: any;
}

const Dropdown = ({ name, hint, label, error, options, onChange }: DropdownProps) => {
  const [formState] = useContext(FormContext); // Get the state/dispatch of form data from FormContext
  return (
    <div className="wmnds-fe-group wmnds-m-b-md">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{label}</h2>
        </legend>
        <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          <label className="wmnds-fe-label" htmlFor={name}>
            {hint}
          </label>
          <select
            className="wmnds-fe-dropdown__select"
            id={name}
            name={name}
            defaultValue={formState.ticketInfo[name] || ''}
            onBlur={onChange}
          >
            <option value="">Choose from list</option>
            {options.map((option: OptionProps) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

Dropdown.defaultProps = {
  onChange: null,
  error: null,
};

export default Dropdown;
