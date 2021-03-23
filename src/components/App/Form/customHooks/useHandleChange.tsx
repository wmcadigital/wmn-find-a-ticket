import React, { useContext, useState } from 'react';
// Import contexts
import { FormContext } from '../../../../globalState';

interface IError {
  message: string;
}

const useHandleChange = () => {
  const [, formDispatch] = useContext(FormContext); // Get the state/dispatch of form data from FormDataContext
  const [value, setValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<IError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    handleChange,
    formDispatch,
    errors,
    setErrors,
  };
};

export default useHandleChange;
