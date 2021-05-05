// TICKET API TYPES
export interface Ticket {
  id: number;
  name: string;
  description: string;
  summary: string;
  type: string;
  brandId: string;
  brand: string;
  firstClass: boolean;
  allowBus: boolean;
  allowMetro: boolean;
  allowTrain: boolean;
  allowPeakTravel: boolean;
  timeLimited: boolean;
  networkTicket: boolean;
  operatorId: string;
  operator: string;
  outOfCounty: boolean;
  passengerTypeId: number;
  passengerType: string;
  requirePhotocard: boolean;
  validityId: number;
  validity: string;
  busTravelAreaId: number;
  busTravelArea: string;
  startDate: string;
  endDate: string;
  ticketCurrentAmount: number;
  standardCurrentAmount: number;
  swiftCurrentAmount?: number | null;
  priceOverride: string;
  purchaseLocations: PurchaseLocations;
  buyOnDirectDebit: boolean;
  buyOnDirectPurchase: boolean;
  buyOnSwift: boolean;
  documents?: (DocumentsEntity | null)[] | null;
  features?: FeaturesEntity[] | null;
  orderSequence: number;
  timePeriod1: boolean;
  timePeriod2: boolean;
  timePeriod3: boolean;
  timePeriod4: boolean;
  displayInSwiftSearch: boolean;
  isSingleOperatorTicket: boolean;
  isPayAsYouGo: boolean;
  hasAddOn: boolean;
  hasPurchaseChannel: boolean;
  hasOnlinePurchaseChannel: boolean;
  isAdult: boolean;
  isChild: boolean;
  isStudent: boolean;
  isConcessionary: boolean;
  isFamily: boolean;
  buyTicketUrl: string;
  relatedTickets?: (RelatedTicketsEntity | null)[] | null;
  directDebitCode?: string | null;
}
export interface PurchaseLocations {
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
}
export interface DocumentsEntity {
  id: string;
  name: string;
}
export interface FeaturesEntity {
  id: string;
  name: string;
  referenceCode: string;
  description: string;
}
export interface RelatedTicketsEntity {
  id: number;
  type: string;
}
