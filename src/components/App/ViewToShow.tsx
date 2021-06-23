import { useFormContext } from 'globalState';
import StartPage from './StartPage';
import Form from './Form/Form';
import usePreviousValue from './Form/customHooks/usePreviousValue';

const ViewToShow = () => {
  const [formState] = useFormContext();
  const previousValue = usePreviousValue(formState.ticketInfo.modes) || [];

  return <div>{formState.currentStep > 0 ? <Form prevMode={previousValue} /> : <StartPage />}</div>;
};

export default ViewToShow;
