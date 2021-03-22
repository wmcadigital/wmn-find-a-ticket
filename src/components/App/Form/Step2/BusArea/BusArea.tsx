import React from 'react';
import Radio from '../../../../shared/Radios/Radio/Radio';
import Button from '../../../../shared/Button/Button';
import RadioProps from '../../../../shared/Radios/Radio/RadioProps';
import questions from '../../questions';

const BusArea = () => {
  const name = 'busAreas';
  const { question, options } = questions[name];
  const regionOptions = [...options.filter((option: any) => option.group === 'region')];
  const localOptions = [...options.filter((option: any) => option.group === 'local')];

  const handleChange = (e: any) => {
    console.log(e);
  };

  return (
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
          <a href="https://find-bus-area.wmnetwork.co.uk">find which bus area meets your needs.</a>
        </p>
      </div>
      <div className="wmnds-fe-group wmnds-m-b-md">
        <fieldset className="wmnds-fe-fieldset">
          <legend className="wmnds-fe-fieldset__legend">
            <h2 className="wmnds-fe-question">{question}</h2>
          </legend>
          <div className="wmnds-fe-radios wmnds-fe-radios--inline wmnds-m-b-md">
            <h3 className="wmnds-m-b-md">Region</h3>
            {/* Loop through radios and display each radio button */}
            {regionOptions.map((radio: RadioProps) => (
              <Radio
                key={radio.text}
                name={name}
                text={radio.text}
                value={radio.value}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="wmnds-fe-radios wmnds-fe-radios--inline wmnds-m-b-md">
            <h3 className="wmnds-m-b-md">Local</h3>
            {localOptions.map((radio: RadioProps) => (
              <Radio
                key={radio.text}
                name={name}
                text={radio.text}
                value={radio.value}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="wmnds-grid">
            <p className="wmnds-col-2-3">
              * Estimate based on ticket duration and travel time. Price shown is for a Monthly
              Direct Debit Peak ticket.
            </p>
          </div>
        </fieldset>
      </div>
      <Button text="Continue" />
    </div>
  );
};

export default BusArea;
