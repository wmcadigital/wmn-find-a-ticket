import dompurify from 'dompurify';
import Radio from 'components/shared/Radios/Radio/Radio';
import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import { useFormContext } from 'globalState';
import questions from '../../questions';
import { Ticket } from '../../types/Tickets.types';
import useHandleChange from '../../customHooks/useHandleChange';

const TicketBundle = ({ results }: { results: Ticket[] }) => {
  const name = 'multiDay';
  const [formState, formDispatch] = useFormContext();
  const { handleChange, genericError, error, setError, value } = useHandleChange(name);
  const { question, hint } = questions[name];
  const { sanitize } = dompurify;
  const dayTicket = results.find(
    (result) => result.validity === '1 Day' && result.type === 'Ticket',
  );

  const handleContinue = () => {
    if (value === 'swiftGo') {
      // Navigate to swift go ticket page
      window.location.href = '/?ticketId=811';
    } else if (value && value.length !== 0) {
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({
        type: 'UPDATE_TICKET_ID',
        payload: `${value}`,
      });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  const onContinue = () => {
    if (value === 'yes') {
      formDispatch({
        type: 'UPDATE_TICKET_INFO',
        payload: { name: 'isMultiDay', value: 'Yes', autoAnswered: false },
      });
    } else {
      handleContinue();
    }
  };

  const multiDayOptions = results
    .filter((result) => result.type === 'Carnet')
    .map((option) => ({ text: `${option.name.replace(/^\D+/g, '')} days`, value: `${option.id}` }))
    .sort((a, b) =>
      parseInt(a.text.replace(/^\D+/g, ''), 10) > parseInt(b.text.replace(/^\D+/g, ''), 10)
        ? 1
        : -1,
    );

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={onContinue}>
        {formState.ticketInfo.isMultiDay ? (
          <Radios
            name={name}
            question={question}
            hint={hint}
            error={error}
            radios={multiDayOptions}
            onChange={handleChange}
          />
        ) : (
          <div className="wmnds-fe-group wmnds-m-b-md">
            <fieldset className="wmnds-fe-fieldset">
              <legend className="wmnds-fe-fieldset__legend">
                <h2 className="wmnds-fe-question wmnds-p-b-xsm wmnds-m-b-md">
                  Would you like a multi-day ticket?
                </h2>
                <p>{hint}</p>
              </legend>
              <div className={`wmnds-fe-radios${error ? ' wmnds-fe-group--error' : ''}`}>
                {/* If there is an error, show here */}
                {error && (
                  <span
                    className="wmnds-fe-error-message"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(error.message),
                    }}
                  />
                )}
                <Radio
                  name="multiDay"
                  text="<strong>Yes</strong> I will need 5, 10 or 15 multi-day tickets"
                  value="yes"
                  onChange={handleChange}
                />
                <Radio
                  name="multiDay"
                  text="<strong>No</strong> I will only need a 1 day ticket"
                  value={`${dayTicket!.id}`}
                  onChange={handleChange}
                />
                <p>
                  <strong>Or</strong>
                </p>
                <Radio
                  name="multiDay"
                  text="<strong>Swift Go</strong> You get charged the best-value fare for a day of travel"
                  value="swiftGo"
                  onChange={handleChange}
                />
              </div>
            </fieldset>
          </div>
        )}
      </QuestionCard>
    </>
  );
};

export default TicketBundle;
