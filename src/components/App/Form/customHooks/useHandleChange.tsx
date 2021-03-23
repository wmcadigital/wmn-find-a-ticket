import React, { useContext, useState } from 'react';
// Import contexts
import { FormContext } from '../../../../globalState';
import GenericError from '../../../shared/Errors/GenericError';

interface IError {
  message: string;
}

const useHandleChange = (name: string) => {
  const [, formDispatch] = useContext(FormContext); // Get the state/dispatch of form data from FormDataContext
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<IError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value) {
      setError(null);
    }
  };

  const handleContinue = () => {
    if (value && value.length !== 0) {
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
