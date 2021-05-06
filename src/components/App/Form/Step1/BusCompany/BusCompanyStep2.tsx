import { TForm, useFormContext } from 'globalState';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useGetValidOperators from '../../customHooks/useGetValidOperators';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const [formState] = useFormContext();
  const { handleChange, handleContinue, value, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name] as typeof questions[typeof name];

  const modesUrlString = (formState.ticketInfo as TForm.TicketInfo).modes.join('+');

  const validBusOperators = useGetValidOperators(formState.apiResults);

  const operatorOptions = validBusOperators.map((option) => ({ text: option, value: option }));
  const otherOptions = options.filter((option) => !validBusOperators.includes(option.text));

  const busInfo = {
    nBus: true,
    buyOnBus: true,
    buyOnWebsite: 'https://google.com',
  };

  return (
    <>
      {genericError}
      <QuestionCard>
        <Dropdown
          label={question}
          hint={hint}
          name={name}
          error={error}
          options={[...operatorOptions, ...otherOptions]}
          onChange={handleChange}
        />
        {/* If there is a value selected and the value has busInfo */}
        {value && busInfo ? (
          <div className="wmnds-inset-text wmnds-m-t-md wmnds-m-b-lg">
            {busInfo.nBus && (
              <>
                <p>{value} are part of the nBus ticket scheme.</p>
                <p>
                  You can catch {value} buses, as well as buses from all other companies in the West
                  Midlands Network with an nBus ticket.
                </p>
              </>
            )}
            {(busInfo.buyOnBus || busInfo.buyOnWebsite) && (
              <p className="wmnds-m-none">
                If you want a ticket that only works on {value} buses, you’ll need to buy one{' '}
                {busInfo.buyOnWebsite && 'from their website'}
                {busInfo.buyOnBus && busInfo.buyOnWebsite && ' or '}
                {busInfo.buyOnBus && 'on the bus'}.
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="wmnds-p-b-lg">
          <a
            className="wmnds-link"
            href={`https://find-bus-company.wmnetwork.co.uk//?ticketSearch=true&modes=${modesUrlString}`}
          >
            I don&rsquo;t know the bus company I travel with
          </a>
        </div>
        <div>
          <div className="wmnds-m-b-md">
            <div className="wmnds-col-3-5">
              <Button
                text={value && busInfo ? 'Continue with a nBus ticket' : 'Continue'}
                onClick={handleContinue}
                iconRight="general-chevron-right"
                btnClass={value && busInfo ? 'wmnds-col-1' : ''}
              />
            </div>
          </div>
          {value && busInfo.buyOnWebsite && (
            <div className="wmnds-col-3-5">
              <a href={busInfo.buyOnWebsite} className="wmnds-btn wmnds-btn--secondary wmnds-col-1">
                Visit the {value} website
                <Icon
                  iconName="general-chevron-right"
                  className="wmnds-btn__icon wmnds-btn__icon--right"
                />
              </a>
            </div>
          )}
        </div>
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep2;
