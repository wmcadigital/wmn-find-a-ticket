/* eslint-disable jsx-a11y/no-onchange */
import dompurify from 'dompurify';
// Import contexts
import { useFormContext, TForm } from 'globalState';
import React from 'react';

const { sanitize } = dompurify;

type DropdownProps = {
  name: keyof TForm.TicketInfo;
  hint: string;
  error: { message: string } | null;
  label: string;
  options: TForm.QuestionOptions[];
  onChange?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({ name, hint, label, error, options, onChange, onBlur }: DropdownProps) => {
  const [formState] = useFormContext(); // Get the state/dispatch of form data from FormContext
  const defaultSelectValue = formState.ticketInfo[name] as string | number; // cast to acceptable types for a select element

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
            defaultValue={defaultSelectValue || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="">Choose from list</option>
            {options.map((option) => (
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

export default Dropdown;
