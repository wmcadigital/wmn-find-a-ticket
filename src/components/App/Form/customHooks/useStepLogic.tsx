import React, { useLayoutEffect, useContext, useCallback } from 'react';
// Import contexts
import { FormContext } from '../../../../globalState';
// Import components
import Button from '../../../shared/Button/Button';

const useStepLogic = () => {
  const [formState, formDispatch] = useContext(FormContext); // Get the state/dispatch of form data from FormDataContext
  const { modes, ticketInfo, mounted } = formState;
  const { traveller, ticketType, travelTime, ticketDuration } = ticketInfo;

  // Function for setting the step of the form

  const setStep = useCallback(
    (step: number) => {
      formDispatch({
        type: 'UPDATE_STEP',
        payload: step,
      });
      window.scrollTo(0, 0);
    },
    [formDispatch],
  );

  const runStepLogic = useCallback(() => {
    if (ticketType) {
      if (traveller) {
        if (travelTime) {
          if (ticketDuration) {
            setStep(4);
          } else {
            setStep(3);
          }
        } else {
          setStep(2);
        }
      } else {
        setStep(1);
      }
    } else {
      setStep(1);
    }
  }, [setStep, traveller, ticketType, travelTime, ticketDuration]);

  const setTicketType = useCallback(() => {
    let tType = null;
    if (modes.includes('train')) {
      // If train mode is selected it will be nTicket
      tType = 'nTicket';
    } else if (!modes.includes('bus')) {
      // If bus mode isn't selected it will be a single
      tType = 'single';
    }
    if (tType || (modes.includes('bus') && ticketType !== 'nBus' && ticketType !== 'single')) {
      formDispatch({
        type: 'UPDATE_TICKET_TYPE',
        payload: tType,
      });
    }
  }, [modes, ticketType, formDispatch]);

  useLayoutEffect(() => {
    if (!mounted && modes) {
      formDispatch({ type: 'MOUNT_APP' });
      setTicketType();
      runStepLogic();
    }
  }, [modes, mounted, setTicketType, runStepLogic, formDispatch]);

  // useEffect(() => {
  //   if(mounted) {
  //     runStepLogic();
  //   }
  // }, [mounted, ticketInfo, runStepLogic]);

  // Update the current step to the correct one depending on users selection
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  // Continue button
  const continueButton = (
    <Button btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-md" type="submit" text="Continue" />
  );

  // const showGenericError = Object.keys(errors).length > 0 && isContinuePressed && (
  //   <GenericError errors={errors} />
  // );

  return {
    setStep,
    setTicketType,
    handleSubmit,
    // showGenericError,
    continueButton,
    formState,
    formDispatch,
  };
};

export default useStepLogic;
