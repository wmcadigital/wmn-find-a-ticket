/* eslint-disable prettier/prettier */
import { useState } from 'react';
// Import contexts
import { useFormContext, TForm } from 'globalState';
import GenericError from 'components/shared/Errors/GenericError';

interface IError {
  message: string;
}

const useHandleChange = (name: TForm.QuestionKeys) => {
  const [formState, formDispatch] = useFormContext(); // Get the state/dispatch of form data from FormDataContext
  const [value, setValue] = useState<string | number[] | null>(formState.ticketInfo[name] || null);
  const [error, setError] = useState<IError | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>,
  ) => {
    if (name === 'railZones') {
      const railZones = e.target.value.split('+').map((zone) => parseInt(zone, 10));
      setValue(railZones);
    } else {
      setValue(e.target.value);
    }
    if (e.target.value) {
      setError(null);
    }
  };

  const handleContinue = () => {
    if (value && value.length !== 0) {
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value } });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  const genericError = error && <GenericError errors={{ required: { message: error?.message } }} />;

  return {
    value,
    handleChange,
    handleContinue,
    genericError,
    formDispatch,
    error,
    setError,
  };
};

export default useHandleChange;
