/* eslint-disable prettier/prettier */
import { useFormContext } from 'globalState';
import Radios from 'components/shared/Radios/Radios';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import usePreviousValue from '../../customHooks/usePreviousValue';

const Traveller = () => {
  const name = 'traveller';
  const [formState] = useFormContext();
  const { handleChange, value, formDispatch, genericError, error, setError } =
    useHandleChange(name);
  const { question, options } = questions[name];
  const prevTraveller = usePreviousValue(formState.ticketInfo.traveller);

  const handleContinue = () => {
    if (value && value.length !== 0) {
      if (formState.editMode && prevTraveller !== value) {
        formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'busArea' } });
      }
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
      if (value === 'concessionary' || value === 'disabled') {
        formDispatch({
          type: 'UPDATE_TICKET_INFO',
          payload: { name: 'travelTime', value: 'concessionary' },
        });
      } else if (formState.ticketInfo.travelTime) {
        formDispatch({
          type: 'REMOVE_TICKET_INFO',
          payload: { name: 'travelTime' },
        });
      }
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

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
