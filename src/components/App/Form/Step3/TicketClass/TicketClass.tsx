import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const TicketClass = () => {
  const name = 'firstClass';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, hint, options } = questions[name];

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Radios
          name={name}
          question={question}
          hint={hint}
          error={error}
          radios={options}
          onChange={handleChange}
        />
      </QuestionCard>
    </>
  );
};

export default TicketClass;
