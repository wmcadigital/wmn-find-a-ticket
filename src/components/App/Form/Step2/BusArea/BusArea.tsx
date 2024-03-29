import dompurify from 'dompurify';
import { useFormContext } from 'globalState';
import Icon from 'components/shared/Icon/Icon';
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
  const [{ ticketInfo }, formDispatch] = useFormContext();
  const { handleChange, genericError, value, error, setError } = useHandleChange(name);
  const { question } = questions[name];
  const { modesQuery, operatorQuery, travellerQuery } = useTicketQueries();
  const { filterResults } = useTicketFilter();
  const travellerBusResults = filterResults({ ...modesQuery, ...operatorQuery, ...travellerQuery });
  const adultBusResults = filterResults({ ...modesQuery, ...operatorQuery });

  const validBusAreas = useGetValidBusAreas(travellerBusResults);
  const validAdultBusAreas = useGetValidBusAreas(adultBusResults);
  const getExcludedBusAreas = () => {
    const travellerBusAreas = [...validBusAreas.regional, ...validBusAreas.local].map((area) =>
      area.name === 'Sandwell & Dudley' ? 'Sandwell and Dudley' : area.name,
    );
    // eslint-disable-next-line prettier/prettier
    const adultBusAreas = [...validAdultBusAreas.regional, ...validAdultBusAreas.local].map(
      (area) => (area.name === 'Sandwell & Dudley' ? 'Sandwell and Dudley' : area.name),
    );
    return adultBusAreas.filter((area) => !travellerBusAreas.includes(area));
  };

  const { local, regional } = validBusAreas;

  const handleContinue = () => {
    if (value && value.length !== 0) {
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value, autoAnswered: false } });
      if (
        (ticketInfo.ticketType === 'nBus' ||
          ticketInfo.busCompany === 'National Express West Midlands') &&
        ticketInfo.traveller !== 'concessionary' &&
        ticketInfo.traveller !== 'disabled'
      ) {
        if (value !== 'West Midlands' && value !== 'Coventry') {
          formDispatch({
            type: 'UPDATE_TICKET_INFO',
            payload: { name: 'travelTime', value: 'any', autoAnswered: true },
          });
        } else if (ticketInfo.travelTime) {
          formDispatch({
            type: 'REMOVE_TICKET_INFO',
            payload: { name: 'travelTime' },
          });
        }
      }
    } else if (!regional.length && !local.length) {
      formDispatch({ type: 'EDIT_MODE', payload: 'traveller' });
      formDispatch({ type: 'UPDATE_STEP', payload: 1 });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  const busCompanyWebsite = () => {
    switch (ticketInfo.busCompany) {
      case 'National Express West Midlands':
        return 'https://nxbus.co.uk/west-midlands/help-information/our-operating-area';
      case 'Diamond Bus':
        return 'https://www.diamondbuses.com/about-us/network-maps/';
      case 'Stagecoach':
        return 'https://www.stagecoachbus.com/maps';
      case 'Johnsons of Henley':
        return 'https://www.johnsonscoaches.co.uk/bus-route-maps/';
      default:
        return 'https://find-bus-area.tfwm.org.uk?ticketSearch=true';
    }
  };

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
          {ticketInfo.busCompany === 'nBus' || !ticketInfo.busCompany ? (
            <>
              <p>Local areas have smaller boundaries and tickets are cheaper.</p>
              <p>Birmingham and Solihull do not have local bus areas. </p>
              <p>
                If you’re not sure, you can{' '}
                <a href="https://find-bus-area.tfwm.org.uk?ticketSearch=true">
                  find out which bus areas particular stops are in
                </a>
                .
              </p>
            </>
          ) : (
            <p>
              If you’re not sure, you can{' '}
              <a href={busCompanyWebsite()} target="_blank" rel="noreferrer">
                view the bus areas on the {ticketInfo.busCompany} website
              </a>
              .
            </p>
          )}
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
                  {local.map((radio) => {
                    const radioName =
                      radio.name === 'Sandwell & Dudley' ? 'Sandwell and Dudley' : radio.name;
                    return (
                      <Radio
                        key={radioName}
                        name={name}
                        text={radioName}
                        value={radioName}
                        onChange={handleChange}
                      />
                    );
                  })}
                </div>
              )}
              {!regional.length && !local.length && (
                <div className="wmnds-warning-text wmnds-m-b-md">
                  <Icon iconName="general-warning-circle" className="wmnds-warning-text__icon" />
                  Sorry, no bus areas match your search.
                </div>
              )}
              {getExcludedBusAreas().length > 0 && (
                <div className="wmnds-inset-text wmnds-m-b-md">
                  <p className="wmnds-m-none">
                    If you only want to travel in the{' '}
                    {getExcludedBusAreas().map((area, i) => (
                      <span key={area.replace(/[^a-z0-9_\s-]/, '')}>
                        {i + 1 !== 1 && (
                          <>{i + 1 === getExcludedBusAreas().length ? ' or ' : ', '}</>
                        )}
                        <strong>{area}</strong>
                      </span>
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
