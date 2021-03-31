import React, { useReducer, createContext } from 'react';
import { setSearchParam, getSearchParam, delSearchParam } from './helpers/URLSearchParams'; // (used to sync state with URL)
import questions from '../components/App/Form/questions';

export const FormContext = createContext(); // Create from context

export const FormProvider = (props) => {
  const { children } = props || {};

  let initialState;

  if (sessionStorage.getItem('ticketInfo')) {
    const storedInfo = sessionStorage.getItem('ticketInfo');
    initialState = JSON.parse(storedInfo);
  } else {
    // Set intial state
    initialState = {
      currentStep: 0,
      editMode: false,
      mounted: false,
      ticketInfo: {
        modes: getSearchParam('modes') ? getSearchParam('modes').split(' ') : null,
        ticketType: getSearchParam('type'),
      },
    };

    // loop through questions object
    Object.keys(questions).forEach((key) => {
      // get search params if present and assign tonitial state
      if (key === 'railZones') {
        // split railzones key into array of integers
        initialState.ticketInfo[key] =
          (getSearchParam(key) &&
            getSearchParam(key)
              .split(' ')
              .map((num) => parseInt(num, 10))) ||
          null;
      } else {
        initialState.ticketInfo[key] = getSearchParam(key) || null;
      }
    });
  }

  // Returns an array of params to be removed based on ticket type
  const infoToRemove = (ticketType) => {
    switch (ticketType) {
      case 'nTicket':
        return ['busCompany', 'busArea'];
      case 'nBus':
        return ['busCompany', 'railZones', 'firstClass'];
      case 'tram':
        return ['busCompany', 'railZones', 'busArea', 'firstClass'];
      case 'single':
        return ['busArea', 'railZones', 'firstClass'];
      default:
        return null;
    }
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Removes unwanted information when changing the ticketType
    const amendTicketType = (ticketType) => {
      const ticketInfo = { ...state.ticketInfo };
      if (ticketType && infoToRemove(ticketType)) {
        infoToRemove(ticketType).forEach((item) => {
          delSearchParam(item);
          ticketInfo[item] = null;
        });
      }
      return ticketInfo;
    };

    switch (action.type) {
      case 'MOUNT_APP':
        return { ...state, mounted: true };
      case 'UPDATE_STEP':
        return { ...state, currentStep: action.payload };
      case 'EDIT_MODE':
        return { ...state, editMode: action.payload };
      case 'UPDATE_MODE':
        setSearchParam('modes', action.payload.join(' '));
        // save state to session storage
        sessionStorage.setItem('ticketInfo', JSON.stringify(state));
        return {
          ...state,
          ticketInfo: { ...amendTicketType(state.ticketInfo.ticketType), modes: action.payload },
        };
      case 'UPDATE_TICKET_TYPE':
        setSearchParam('type', action.payload);
        // save state to session storage
        sessionStorage.setItem('ticketInfo', JSON.stringify(state));
        return {
          ...state,
          ticketInfo: { ...amendTicketType(action.payload), ticketType: action.payload },
        };
      case 'UPDATE_TICKET_INFO':
        setSearchParam(action.payload.name, action.payload.value);
        // save state to session storage
        sessionStorage.setItem('ticketInfo', JSON.stringify(state));
        return {
          ...state,
          ticketInfo: { ...state.ticketInfo, [action.payload.name]: action.payload.value },
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return <FormContext.Provider value={[formState, formDispatch]}>{children}</FormContext.Provider>;
};
