import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const BusCompanyStep1 = () => {
  const name = 'busNetwork';
  // eslint-disable-next-line prettier/prettier
  const { formDispatch, handleChange, value, genericError, error, setError } =
    useHandleChange(name);
  const { question, hint, options } = questions[name] as typeof questions[typeof name];

  const handleContinue = () => {
    if (value) {
      // turn off edit mode

      formDispatch({ type: 'EDIT_MODE', payload: value === 'yes' ? null : 'busCompanyStep2' });
      formDispatch({ type: 'UPDATE_TICKET_TYPE', payload: value === 'yes' ? 'nBus' : 'single' });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Radios
          name={name}
          question={question}
          hint={hint}
          radios={options}
          error={error}
          onChange={handleChange}
        />
        <div className="wmnds-p-b-lg">
          <a href="https://journeyplanner.tfwm.org.uk/" target="_blank" rel="noreferrer">
            I don&rsquo;t know which bus I need
          </a>
        </div>
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep1;
