import { TForm, useFormContext } from 'globalState';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const [formState] = useFormContext();
  const { handleChange, handleContinue, value, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name] as typeof questions[typeof name];

  const modesUrlString = (formState.ticketInfo as TForm.TicketInfo).modes.join('+');

  const busInfo = {
    nBus: true,
    buyOnBus: true,
    buyOnWebsite: 'https://google.com',
  };

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Dropdown
          label={question}
          hint={hint}
          name={name}
          error={error}
          options={options}
          onChange={handleChange}
        />
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
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep2;
