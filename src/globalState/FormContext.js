import React, { useReducer, createContext } from 'react';
import { setSearchParam, getSearchParam } from './helpers/URLSearchParams'; // (used to sync state with URL)
import questions from '../components/App/Form/questions';

export const FormContext = createContext(); // Create from context

export const FormProvider = (props) => {
  const { children } = props || {};

  // Set intial state
  const initialState = {
    modes: getSearchParam('modes') ? getSearchParam('modes').split(' ') : null,
    currentStep: 0,
    mounted: false,
    ticketInfo: {
      ticketType: getSearchParam('type'),
    },
  };

  // loop through questions object
  Object.keys(questions).forEach((key) => {
    // get search params if present and assign to initial state
    initialState.ticketInfo[key] = getSearchParam(key) || null;
  });

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    switch (action.type) {
      case 'MOUNT_APP':
        return { ...state, mounted: true };
      case 'UPDATE_STEP':
        return { ...state, currentStep: action.payload };
      case 'UPDATE_MODE':
        setSearchParam('modes', action.payload.join(' '));
        return { ...state, modes: action.payload };
      case 'UPDATE_TICKET_TYPE':
        setSearchParam('type', action.payload);
        return { ...state, ticketInfo: { ...state.ticketInfo, ticketType: action.payload } };
      case 'UPDATE_TICKET_INFO':
        setSearchParam(action.payload.name, action.payload.value);
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
