import React from 'react';
import dompurify from 'dompurify';
import Radio from '../../../../shared/Radios/Radio/Radio';
import Icon from '../../../../shared/Icon/Icon';
import QuestionCard from '../../../../shared/QuestionCard/QuestionCard';
import useHandleChange from '../../customHooks/useHandleChange';
import s from './RailZone.module.scss';
import AutoComplete from './AutoComplete/AutoComplete';

const { sanitize } = dompurify;

function RailZone() {
  const name = 'railZones';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <h2 className="wmnds-fe-question">Which train stations will you use?</h2>
        <p>Train stations in the West Midlands are in zones.</p>
        <p>You can choose which zones your train ticket will cover.</p>
        <AutoComplete />
        <div className="wmnds-grid wmnds-grid--spacing-md-2-md wmnds-m-b-lg">
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <a
              href="https://find-a-ticket.wmnetwork.co.uk"
              className={`wmnds-btn--link ${s.btnLinkIconLeft}`}
            >
              <Icon className="wmnds-btn__icon" iconName="general-location-pin" />
              View rail zones on a map
            </a>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <a
              href="https://find-a-ticket.wmnetwork.co.uk"
              className={`wmnds-btn--link ${s.btnLinkIconLeft}`}
            >
              <Icon className="wmnds-btn__icon" iconName="general-list" />
              View rail zones in a list
            </a>
          </div>
        </div>
        <div className="wmnds-fe-group wmnds-m-b-md">
          <fieldset className="wmnds-fe-fieldset">
            <legend className="wmnds-fe-fieldset__legend">
              <h2 className="wmnds-fe-question">Select your rail zones</h2>
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
                <Radio
                  key="railZones1_4"
                  name="railZones"
                  text="<strong>Zone 1 to 4</strong> From £68.50*"
                  value="1+4"
                  onChange={handleChange}
                />
                <Radio
                  key="railZones2_5"
                  name="railZones"
                  text="<strong>Zone 2 to 5</strong> From £60.00*"
                  value="2+5"
                  onChange={handleChange}
                />
                <details className="wmnds-details wmnds-m-b-md">
                  <summary className="wmnds-link">I need to travel in more zones</summary>
                  <div className="wmnds-details__content">
                    <p>Select a different zone</p>
                    <Radio
                      key="railZones1_5"
                      name="railZones"
                      text="<strong>Zone 1 to 5</strong> From £74.60*"
                      value="1+5"
                      onChange={handleChange}
                    />
                  </div>
                </details>
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
      </QuestionCard>
    </>
  );
}

export default RailZone;
