import React from 'react';
import dompurify from 'dompurify';
import Radio from '../../../../shared/Radios/Radio/Radio';
import Button from '../../../../shared/Button/Button';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const { sanitize } = dompurify;

const BusArea = () => {
  const name = 'busArea';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, options } = questions[name];
  // Filter out options into groups
  const regionOptions = [...options.filter((option: any) => option.group === 'region')];
  const localOptions = [...options.filter((option: any) => option.group === 'local')];

  return (
    <>
      {genericError}
      <div className="bg-white wmnds-p-lg wmnds-m-b-lg">
        <h2 className="wmnds-fe-question">Which bus area will you travel in?</h2>
        <div className="wmnds-m-b-lg">
          <p>The West Midlands is split into different bus areas.</p>
          <p>
            You can choose which areas your ticket covers. For example, if you only travel in the
            Black Country, you can get a Black Country ticket.
          </p>
          <p>To travel in Birmingham and Solihull you need to select the West Midlands bus area.</p>
          <p>
            If you’re not sure, you can{' '}
            <a href="https://find-bus-area.wmnetwork.co.uk">
              find which bus area meets your needs.
            </a>
          </p>
        </div>
        <div className="wmnds-fe-group wmnds-m-b-md">
          <fieldset className="wmnds-fe-fieldset">
            <legend className="wmnds-fe-fieldset__legend">
              <h2 className="wmnds-fe-question">{question}</h2>
            </legend>
            <div className={error ? ' wmnds-fe-group--error' : ''}>
              {/* If there is an error, show here */}
              {error && (
                <span
                  className="wmnds-fe-error-message"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(error.message),
                  }}
                />
              )}
              <div className="wmnds-fe-radios wmnds-fe-radios--inline wmnds-m-b-md">
                <h3 className="wmnds-m-b-md">Region</h3>
                {/* Loop through radios and display each radio button */}
                {regionOptions.map((radio) => (
                  <Radio
                    key={radio.text}
                    name={name}
                    text={radio.html}
                    value={radio.value}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <div className="wmnds-fe-radios wmnds-fe-radios--inline wmnds-m-b-md">
                <h3 className="wmnds-m-b-md">Local</h3>
                {localOptions.map((radio) => (
                  <Radio
                    key={radio.text}
                    name={name}
                    text={radio.html}
                    value={radio.value}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="wmnds-grid">
              <p className="wmnds-col-2-3">
                * Estimate based on ticket duration and travel time. Price shown is for a Monthly
                Direct Debit Peak ticket.
              </p>
            </div>
          </fieldset>
        </div>
        <Button text="Continue" onClick={handleContinue} />
      </div>
    </>
  );
};

export default BusArea;
