import React from 'react';

interface OptionProps {
  text: string;
  value: string;
}

interface DropdownProps {
  name: string;
  hint: string;
  label: string;
  options: OptionProps[];
  onChange?: any;
}

const Dropdown = ({ name, hint, label, options, onChange }: DropdownProps) => {
  return (
    <div className="wmnds-fe-group wmnds-m-b-md">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{label}</h2>
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
        <div className="wmnds-fe-dropdown">
          <label className="wmnds-fe-label" htmlFor={name}>
            {hint}
          </label>
          <select className="wmnds-fe-dropdown__select" id={name} name={name} onBlur={onChange}>
            <option value="" selected>
              Choose from list
            </option>
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
};

export default Dropdown;
