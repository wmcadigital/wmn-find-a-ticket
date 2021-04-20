/* eslint-disable prettier/prettier */
import { setSearchParam, getSearchParam, delSearchParam } from '../helpers/URLSearchParams'; // (used to sync state with URL)
import questions from '../../components/App/Form/questions';
import * as TForm from './FormContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TForm.State = {
    currentStep: 0,
    editMode: null,
    mounted: false,
    showAnswers: false,
    ticketInfo: {},
  };

  if (window.location.search.length === 0) {
    sessionStorage.clear();
  }

  const storedInfo: TForm.TicketInfo =
    JSON.parse(sessionStorage.getItem('ticketInfo') as string) || {};

  // Set search params for modes & ticketType if stored
  if (storedInfo.modes) {
    setSearchParam('modes', storedInfo.modes.toString());
  }
  if (storedInfo.ticketType) {
    setSearchParam('type', storedInfo.ticketType);
  }

  // Set intial state
  state.ticketInfo = {
    // Cast the corrext types for modes and type as getSearchParam returns string | null
    modes: storedInfo.modes || (getSearchParam('modes')?.split(' ') as TForm.TicketInfo['modes']),
    ticketType: storedInfo.ticketType || (getSearchParam('type') as TForm.TicketInfo['ticketType']),
  };

  let { ticketInfo } = state; // create a variable with the right types to be added back to the state obj at the end
  // loop through questions object
  (Object.keys(questions) as TForm.QuestionKeys[]).forEach((key) => {
    // split string into array of integers
    const strToIntArray = (str: string | null) =>
      str ? str.split(' ').map((num) => parseInt(num, 10)) : null;

    if (storedInfo[key]) {
      ticketInfo = { ...ticketInfo, [key]: storedInfo[key] };

      if (key === 'railZones') {
        setSearchParam(key, (storedInfo[key] as number[]).join(' '));
      } else {
        setSearchParam(key, storedInfo[key] as string);
      }
    } else if (key === 'railZones') {
      // get search params if present and assign to initial state
      ticketInfo = { ...ticketInfo, [key]: strToIntArray(getSearchParam(key)) };
    } else {
      ticketInfo = { ...ticketInfo, [key]: getSearchParam(key) };
    }
  });

  return { ...state, ticketInfo };
})();

// Returns an array of params to be removed based on ticket type
const infoToRemove = (ticketType: TForm.TicketTypes): TForm.QuestionKeys[] => {
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
      return [];
  }
};

export const reducer = (state = initialState, action: TForm.StateAction): TForm.State => {
  // Removes unwanted information when changing the ticketType
  const amendTicketType = (ticketType: TForm.TicketTypes) => {
    const ticketInfo = { ...state.ticketInfo };
    if (ticketType && infoToRemove(ticketType).length) {
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
      return {
        ...state,
        ticketInfo: {
          ...amendTicketType(state.ticketInfo?.ticketType as TForm.TicketTypes),
          modes: action.payload,
        },
      };

    case 'UPDATE_TICKET_TYPE':
      setSearchParam('type', action.payload as string);
      return {
        ...state,
        ticketInfo: {
          ...amendTicketType(action.payload as TForm.TicketTypes),
          ticketType: action.payload,
        },
      };

    case 'UPDATE_TICKET_INFO':
      setSearchParam(action.payload.name, action.payload.value!.toString());
      return {
        ...state,
        ticketInfo: { ...state.ticketInfo, [action.payload.name]: action.payload.value },
      };

    case 'TOGGLE_SHOW_ANSWERS':
      return {
        ...state,
        showAnswers: action.payload,
      };

    // Default should return intial state if error
    default:
      return initialState;
  }
};