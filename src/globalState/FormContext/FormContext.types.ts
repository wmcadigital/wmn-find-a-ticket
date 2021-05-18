import questions from 'components/App/Form/questions';
import { Ticket } from 'components/App/Form/customHooks/Tickets.types';
// e.g. importing: import * as TForm
// e.g. use: TForm.QuestionKeys

type Nullable<T> = T | null;

export type Questions = typeof questions;
export type QuestionKeys = keyof Questions;
export type Pages = QuestionKeys | 'modes' | 'busCompanyStep2' | 'isMultiDay';
export type Modes = 'bus' | 'tram' | 'train';
export type TicketTypes = 'nTicket' | 'nBus' | 'tram' | 'single';

export interface IStations {
  id: string;
  queryId: number;
  crsCode: string;
  stationName: string;
  railZone: string;
  parking: boolean;
  stepFreeAccess: string;
}

export type TicketInfo = {
  busArea: Nullable<string>;
  busCompany: Nullable<string>;
  busNetwork: Nullable<string>;
  firstClass: Nullable<string>;
  modes: Nullable<Modes>[];
  isMultiDay: Nullable<string>;
  multiDay: Nullable<string>;
  railZones: Nullable<number[]>;
  outOfCounty: Nullable<boolean>;
  stations: Nullable<string>;
  ticketDuration: Nullable<string>;
  ticketType: Nullable<TicketTypes>;
  travelTime: Nullable<string>;
  traveller: Nullable<string>;
};

// Get type from common options properties in the questions objects
// As they all have text & value properties => { text: string; value: string; }
export type QuestionOptions = Questions[QuestionKeys]['options'][number] & {
  html?: string;
  info?: string;
};

export type State = {
  currentStep: number;
  editMode: Nullable<Pages>;
  mounted: boolean;
  showAnswers: boolean;
  ticketInfo: Partial<TicketInfo>;
  ticketId: Nullable<string>;
  apiResults: Ticket[];
  operators: any[];
};

/* eslint-disable @typescript-eslint/indent */
export type StateAction =
  | {
      type: 'MOUNT_APP';
    }
  | {
      type: 'UPDATE_STEP';
      payload: number;
    }
  | {
      type: 'EDIT_MODE';
      payload: Nullable<Pages>;
    }
  | {
      type: 'UPDATE_MODE';
      payload: Modes[];
    }
  | {
      type: 'UPDATE_TICKET_TYPE';
      payload: Nullable<TicketTypes>;
    }
  | {
      type: 'UPDATE_TICKET_INFO';
      payload: {
        name: keyof TicketInfo;
        value: TicketInfo[keyof TicketInfo];
      };
    }
  | {
      type: 'REMOVE_TICKET_INFO';
      payload: {
        name: keyof TicketInfo;
      };
    }
  | {
      type: 'RESET_TICKET_INFO';
      payload?: { [key: string]: any };
    }
  | {
      type: 'ADD_API_RESULTS';
      payload: Ticket[];
    }
  | {
      type: 'ADD_OPERATORS';
      payload: any[];
    }
  | {
      type: 'UPDATE_TICKET_ID';
      payload: string | null;
    }
  | {
      type: 'TOGGLE_SHOW_ANSWERS';
      payload: boolean;
    };

export type Context = [State, React.Dispatch<StateAction>];
