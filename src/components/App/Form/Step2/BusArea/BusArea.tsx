import dompurify from 'dompurify';
import { useFormContext } from 'globalState';
import Radio from 'components/shared/Radios/Radio/Radio';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useGetValidBusAreas from '../../customHooks/useGetValidBusAreas';

const { sanitize } = dompurify;

const BusArea = () => {
  const name = 'busArea';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question } = questions[name];
  const [formState] = useFormContext();

  const validBusAreas = useGetValidBusAreas(formState.apiResults);
  const { local, regional } = validBusAreas;

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <h2 className="wmnds-fe-question">Which bus area will you travel in?</h2>
        <div className="wmnds-m-b-lg">
          <p>
            The West Midlands is split into different bus areas. You can choose which bus area you
            want your ticket to cover.{' '}
          </p>
          <p>Local areas have smaller boundaries and tickets are cheaper.</p>
          <p>Birmingham and Solihull do not have local bus areas. </p>
          <p>
            If you’re not sure, you can{' '}
            <a href="https://find-bus-area.wmnetwork.co.uk">
              find out which bus areas particular stops are in
            </a>
            .
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
              <div className="wmnds-fe-radios wmnds-m-b-md">
                <h3 className="wmnds-m-b-md">Region</h3>
                {/* Loop through radios and display each radio button */}
                {regional.map((radio) => (
                  <Radio
                    key={radio.name}
                    name={name}
                    text={`<strong>${radio.name}</strong> ${radio.description || ''}`}
                    value={radio.name}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <div className="wmnds-fe-radios wmnds-m-b-md">
                <h3 className="wmnds-m-b-md">Local</h3>
                {local.map((radio) => (
                  <Radio
                    key={radio.name}
                    name={name}
                    text={radio.name}
                    value={radio.name}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </fieldset>
        </div>
      </QuestionCard>
    </>
  );
};

export default BusArea;
