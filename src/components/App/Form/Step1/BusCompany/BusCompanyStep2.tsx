import { TForm, useFormContext } from 'globalState';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const [formState] = useFormContext();
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name] as typeof questions[typeof name];

  const modesUrlString = (formState.ticketInfo as TForm.TicketInfo).modes.join('+');

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
          onBlur={handleChange}
        />
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
