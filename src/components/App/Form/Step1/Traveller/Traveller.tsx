import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';

const Traveller = () => {
  const name = 'traveller';
  const { handleChange, handleContinue, genericError, error } = useHandleChange(name);
  const { question, options } = questions[name];

  return (
    <>
      {genericError}
      <QuestionCard handleContinue={handleContinue}>
        <Radios
          name="traveller"
          question={question}
          radios={options}
          error={error}
          onChange={handleChange}
        />
      </QuestionCard>
    </>
  );
};

export default Traveller;
