import React, { useContext } from 'react';
import { FormContext } from '../../globalState';
import StartPage from './StartPage';
import Form from './Form/Form';

const ViewToShow = () => {
  const [formState] = useContext(FormContext);
  return <div>{formState.currentStep > 0 ? <Form /> : <StartPage />}</div>;
};

export default ViewToShow;
