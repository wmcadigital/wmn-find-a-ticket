import { useFormContext } from 'globalState';
import BusCompanyStep1 from './BusCompanyStep1';
import BusCompanyStep2 from './BusCompanyStep2';

const BusOperator = () => {
  const [formState] = useFormContext();

  return !formState.ticketInfo.ticketType || formState.editMode === 'busCompany' ? (
    <BusCompanyStep1 />
  ) : (
    <BusCompanyStep2 />
  );
};

export default BusOperator;
