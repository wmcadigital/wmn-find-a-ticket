import { useFormContext } from 'globalState';
import Header from 'components/shared/Header/Header';
import Footer from 'components/shared/Footer/Footer';
import StartPage from './StartPage';
import Form from './Form/Form';
import usePreviousValue from './Form/customHooks/usePreviousValue';

const ViewToShow = () => {
  const [{ currentStep, ticketInfo, isSwiftApp }] = useFormContext();
  const previousValue = usePreviousValue(ticketInfo.modes) || [];

  return (
    <>
      {!isSwiftApp && <Header />}
      <div className="wmnds-container--main wmnds-m-none">
        {currentStep > 0 ? <Form prevMode={previousValue} /> : <StartPage />}
      </div>
      {!isSwiftApp && <Footer />}
    </>
  );
};

export default ViewToShow;
