export interface Ticket {
  id: number;
  modified: string;
  name: string;
  status: string;
  description: string;
  summary: string;
  type: string;
  brand: string;
  brandId: string;
  allowBus: boolean;
  allowMetro: boolean;
  allowTrain: boolean;
  allowPeakTravel: boolean;
  timeLimited: boolean;
  busTravelArea: string;
  busTravelAreaId: number;
  directDebitCode: string;
  directDebitAddOnCode: string;
  startDate: string;
  endDate: string;
  matrixId: string;
  networkTicket: boolean;
  operator: string;
  operatorId: string;
  outOfCounty: boolean;
  passengerType: string;
  passengerTypeId: number;
  purchaseLocations: PurchaseLocations;
  maximumAdvancePurchaseDays: number;
  minimumAdvancePurchaseDays: number;
  buyOnDirectDebit: boolean;
  buyOnDirectPurchase: boolean;
  buyOnSwift: boolean;
  workwiseEligible: boolean;
  productUrl: string;
  firstClass: boolean;
  requirePhotocard: boolean;
  station: string;
  validity: string;
  validityId: number;
  validityDays: string;
  priceLevels?: PriceLevelsEntity[] | null;
  priceOverride: string;
  documents?: DocumentsEntity[] | null;
  relatedTickets?: any[] | null;
  outlets?: any[] | null;
  features?: FeaturesEntity[] | null;
  availabilityText: string;
  orderSequence: number;
  fareBand: FareBandOrTimeBand;
  timeBand: FareBandOrTimeBand;
  timePeriod1: boolean;
  timePeriod2: boolean;
  timePeriod3: boolean;
  timePeriod4: boolean;
  supportingDocuments: SupportingDocuments;
  exportToJourneyPlanner: boolean;
  exportToTicketing: boolean;
  exportToSwiftPortal: boolean;
  exportToPayzone: boolean;
  exportToMetro: boolean;
  directives?: DirectivesEntity[] | null;
  maximumAdvancePurchaseDaysForCustomer: number;
  minimumAdvancePurchaseDaysForCustomer: number;
  hasMaximumAdvancePurchaseDays: boolean;
  isSingleOperatorTicket: boolean;
  isPayAsYouGo: boolean;
  hasMinimumAdvancePurchaseDays: boolean;
  hasAddOn: boolean;
  railZoneFrom?: number;
  railZoneTo?: number;
  hasPurchaseChannel: boolean;
  hasOnlinePurchaseChannel: boolean;
  isAdult: boolean;
  isChild: boolean;
  isStudent: boolean;
  isConcessionary: boolean;
  isFamily: boolean;
  isNxDaySaver: boolean;
  isCoventry: boolean;
  isDaytripperAddOn: boolean;
  isDaytripperPlus: boolean;
  availableOperators: string;
  isSeasonTicket: boolean;
  displayInSwiftSearch: boolean;
  ticketCurrentAmount: number;
  standardCurrentAmount: number;
  swiftCurrentAmount?: number;
  buyTicketUrl: string;
  termStartDate?: string;
  termEndDate?: string;
  website?: string;
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
export interface PriceLevelsEntity {
  startDate: string;
  amount: number;
  isSwift: boolean;
  isOnline: boolean;
  type: string;
  precedence: number;
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
export interface FareBandOrTimeBand {
  key: string;
  value: string;
}
export interface SupportingDocuments {
  evidenceAllowed: boolean;
  minDocuments: number;
  maxDocuments: number;
}
export interface DirectivesEntity {
  id: string;
  name: string;
  code: string;
  description: string;
  qualifier: string;
  category: string;
}
