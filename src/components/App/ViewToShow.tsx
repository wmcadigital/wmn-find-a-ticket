import { useFormContext } from 'globalState';
import StartPage from './StartPage';
import Form from './Form/Form';

const ViewToShow = () => {
  const [formState] = useFormContext();
  return <div>{formState.currentStep > 0 ? <Form /> : <StartPage />}</div>;
};

export default ViewToShow;
