export type TApiTicket = {
  // Info
  id: number;
  name: string;
  description: string;
  summary: string;
  type: string;
  // Ticket meta
  startDate: Date;
  endDate: Date;
  isSingleOperatorTicket: boolean;
  isPayAsYouGo: boolean;
  hasAddOn: boolean;
  // Ticket permissions
  firstClass: boolean;
  allowPeakTravel: boolean;
  timeLimited: boolean;
  networkTicket: boolean;
  outOfCounty: boolean;
  requirePhotocard: boolean;
  timePeriod1: boolean;
  timePeriod2: boolean;
  timePeriod3: boolean;
  timePeriod4: boolean;
  // Modes
  allowBus: boolean;
  allowMetro: boolean;
  allowTrain: boolean;
  // Brand
  brand: string;
  brandId: string;
  // Operator
  operatorId: string;
  operator: string;
  // Passenger
  passengerTypeId: number;
  passengerType: string;
  isAdult: boolean;
  isChild: boolean;
  isStudent: boolean;
  isConcessionary: boolean;
  isFamily: boolean;
  // Validity
  validityId: number;
  validity: string;
  // Bus area
  busTravelAreaId: number;
  busTravelArea: string;
  // Price
  ticketCurrentAmount: number;
  standardCurrentAmount: number;
  swiftCurrentAmount: number;
  priceOverride: number;
  buyOnDirectDebit: boolean;
  buyOnDirectPurchase: boolean;
  buyOnSwift: boolean;
  // Purchase
  purchaseLocations: {
    natEx: boolean;
    railStation: boolean;
    tic: boolean;
    payzone: boolean;
    onBus: boolean;
    onMetro: boolean;
    onSSP: boolean;
    swiftKiosk: boolean;
    swiftOnMobile: boolean;
    swiftRemoteRetail: boolean;
  };
  buyTicketUrl: string;
  hasPurchaseChannel: boolean;
  hasOnlinePurchaseChannel: boolean;
  displayInSwiftSearch: boolean;
  // related data
  documents: Array<{
    id: string;
    name: string;
  }>;
  features: Array<{
    id: string;
    name: string;
    referenceCode: string;
    description: string;
  }>;
  relatedTickets: Array<{
    id: number;
    type: string;
  }>;
};
