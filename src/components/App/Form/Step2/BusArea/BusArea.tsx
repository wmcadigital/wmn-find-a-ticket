import dompurify from 'dompurify';
import Radio from 'components/shared/Radios/Radio/Radio';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketQueries from '../../customHooks/useTicketQueries';
import useTicketFilter from '../../customHooks/useTicketFilter';
import useGetValidBusAreas from '../../customHooks/useGetValidBusAreas';

const { sanitize } = dompurify;

const BusArea = () => {
  const name = 'busArea';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question } = questions[name];
  const { modesQuery, operatorQuery, travellerQuery } = useTicketQueries();
  const { filterResults } = useTicketFilter();
  const travellerBusResults = filterResults({ ...modesQuery, ...operatorQuery, ...travellerQuery });
  const adultBusResults = filterResults({ ...modesQuery, ...operatorQuery });

  const validBusAreas = useGetValidBusAreas(travellerBusResults);
  const validAdultBusAreas = useGetValidBusAreas(adultBusResults);
  const getExcludedBusAreas = () => {
    const travellerBusAreas = [...validBusAreas.regional, ...validBusAreas.local].map(
      (area) => area.name,
    );
    const adultBusAreas = [...validAdultBusAreas.regional, ...validAdultBusAreas.local].map(
      (area) => area.name,
    );
    return adultBusAreas.filter((area) => !travellerBusAreas.includes(area));
  };

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
              {regional.length > 0 && (
                <div className="wmnds-fe-radios wmnds-m-b-md">
                  {local.length > 0 && <h3 className="wmnds-m-b-md">Region</h3>}
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
              )}
              {local.length > 0 && (
                <div className="wmnds-fe-radios wmnds-m-b-md">
                  {regional.length > 0 && <h3 className="wmnds-m-b-md">Local</h3>}
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
              )}
              {getExcludedBusAreas().length > 0 && (
                <div className="wmnds-inset-text wmnds-m-b-md">
                  <p className="wmnds-m-none">
                    If you only want to travel in the{' '}
                    {getExcludedBusAreas().map((area, i) => (
                      <>
                        {i + 1 !== 1 && (
                          <>{i + 1 === getExcludedBusAreas().length ? ' or ' : ', '}</>
                        )}
                        <strong>{area}</strong>
                      </>
                    ))}{' '}
                    <strong>bus areas</strong> then you&rsquo;ll need to buy an adult ticket
                  </p>
                </div>
              )}
            </div>
          </fieldset>
        </div>
      </QuestionCard>
    </>
  );
};

export default BusArea;
