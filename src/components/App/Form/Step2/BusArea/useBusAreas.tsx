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

interface UniqueBusAreas {
  value: string;
  name?: string;
  operator?: string;
}

const getUniqueBusAreas = (tickets: Ticket[]) => {
  const arr: UniqueBusAreas[] = [];

  const uniqueBusAreas = tickets
    .map((result) => {
      return { value: result.busTravelArea, operator: result.operator };
    })
    .filter((item) => {
      const i = arr.findIndex((x) => x.value === item.value);
      if (i === -1) {
        arr.push(item);
        return item;
      }
      return null;
    })
    .map((area) => {
      let name = area.value;
      if (area.value === 'Entire Operator Area')
        name = area.value.replace('Entire Operator', area.operator);
      return { name, value: area.value };
    });

  return uniqueBusAreas;
};

const getSubText = (area: string) => {
  if (area === 'West Midlands') return 'Whole region, including Birmingham and Solihull';
  if (area === 'Black Country') return 'Whole region, including Birmingham and Solihull';
  return '';
};

interface Areas {
  name: string;
  value: string;
  subText?: string;
}

const filterAreas = (areas: Areas[], size = 'regional') => {
  const regionalAreas = ['West Midlands', 'Black Country', 'Entire Operator Area'];

  if (size === 'regional') {
    const getSpecificAreas = areas
      .filter(({ value }) => regionalAreas.includes(value))
      .map((area) => {
        return {
          area,
          subText: getSubText(area.value),
        };
      });

    return getSpecificAreas;
  }

  return areas.filter(({ value }) => !regionalAreas.includes(value));
};

const useGetValidBusAreas = (tickets: Ticket[]) => {
  const noAreasFound = {
    regional: [],
    local: [],
  };
  if (!tickets.length) return noAreasFound;

  const uniqueBusAreas = getUniqueBusAreas(tickets);

  const regional = filterAreas(uniqueBusAreas);
  const local = filterAreas(uniqueBusAreas, 'local');

  const busAreas = {
    regional,
    local,
  };

  return busAreas;
};

export default useGetValidBusAreas;
