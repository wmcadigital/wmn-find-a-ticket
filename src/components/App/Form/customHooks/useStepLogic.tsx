import { useLayoutEffect, useEffect, useCallback } from 'react';
// Import contexts
import { useFormContext, TForm } from 'globalState';

const useStepLogic = () => {
  const [formState, formDispatch] = useFormContext(); // Get the state/dispatch of form data from FormDataContext
  const { ticketInfo, mounted, editMode, ticketId } = formState;
  const { modes, ticketType } = ticketInfo;

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

  // Logic which determines which step to go to based on data available
  const runStepLogic = useCallback(() => {
    const {
      traveller,
      travelTime,
      busCompany,
      busArea,
      railZones,
      firstClass,
      ticketDuration,
      multiDay,
    } = ticketInfo;
    formDispatch({ type: 'EDIT_MODE', payload: null });

    // Checks to see if step 1 is complete
    const step1Check =
      (ticketType && traveller && busCompany) ||
      (ticketType && traveller && ticketType !== 'single');
    // Checks to see if step 2 is complete
    const step2Check =
      (travelTime && busArea && (ticketType === 'nBus' || ticketType === 'single')) ||
      (travelTime && railZones && ticketType === 'nTicket') ||
      (railZones && ticketType === 'tram');
    // Checks to see if step 3 is complete
    const step3Check =
      (ticketId && ticketDuration && ticketType !== 'nTicket') ||
      (ticketId && ticketDuration && ticketType !== 'nTicket' && multiDay) ||
      (ticketId && ticketDuration && firstClass) ||
      (ticketId &&
        ticketDuration &&
        railZones &&
        (Math.min(...ticketInfo.railZones!) !== 1 || Math.max(...ticketInfo.railZones!) < 4)) ||
      (travelTime && ticketType === 'tram' && ticketDuration);

    // If step checks fail (return false), go to the step to get the correct information
    if (ticketId) {
      setStep(4);
    } else if (step1Check) {
      if (step2Check) {
        if (step3Check) {
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
    // save state to session storage
    sessionStorage.setItem('ticketInfo', JSON.stringify(ticketInfo));
  }, [setStep, formDispatch, ticketInfo, ticketId, ticketType]);

  // Try to set the ticket type based on data available
  const setTicketType = useCallback(() => {
    let tType: TForm.TicketTypes | null = null;
    if (modes?.includes('train')) {
      // If train mode is selected it will be 'nTicket'
      tType = 'nTicket';
    } else if (!modes?.includes('bus')) {
      // If bus mode isn't selected it will be 'single'
      tType = 'tram';
    }
    // Do the ticket update only if:
    // - tType is set (above)
    // - or bus mode is selected and ticket type is not set to nBus or single (we set these in step 1)
    if (tType || (modes?.includes('bus') && ticketType !== 'nBus' && ticketType !== 'single')) {
      formDispatch({
        type: 'UPDATE_TICKET_TYPE',
        payload: tType,
      });
    }
  }, [modes, ticketType, formDispatch]);

  useLayoutEffect(() => {
    // If app is just mounted run setTicketType and stepLogic
    if (!mounted && modes) {
      formDispatch({ type: 'MOUNT_APP' });
      setTicketType();
      runStepLogic();
    }
  }, [modes, mounted, setTicketType, runStepLogic, formDispatch]);

  // Run step logic when ticketInfo is updated
  useLayoutEffect(() => {
    if (mounted && !editMode) {
      runStepLogic();
    }
  }, [mounted, editMode, ticketInfo, runStepLogic]);

  // Run ticket type logic when modes are updated
  useEffect(() => {
    if (modes) {
      setTicketType();
    }
  }, [modes, setTicketType]);
  return {
    setStep,
    setTicketType,
    runStepLogic,
    formState,
    formDispatch,
  };
};

export default useStepLogic;
