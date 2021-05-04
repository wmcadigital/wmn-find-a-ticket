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
// END OF TICKET API TYPES

// START OF HELPER FUNC
interface ValidArea {
  name: string;
  busTravelArea: string;
  description: string | null;
}

// Return 'static' text back for use in the description field, if area doesn't have a description then return null
const getBusAreaDescription = (busTravelArea: string, operator: string) => {
  if (busTravelArea === 'West Midlands') return 'Whole region, including Birmingham and Solihull';
  if (busTravelArea === 'Black Country') return 'Sandwell and Dudley, Walsall and Wolverhampton';
  if (busTravelArea === 'Entire Operator Area')
    return `All ${operator} services in the West Midlands`;
  return null;
};

// Sets remaining areas to object structured like: {name, busTravelArea, description}
const setNewAreaObject = ({ busTravelArea, operator }: Ticket): ValidArea => {
  let name = busTravelArea; // By default, set the name to display the same as busTravelArea

  // If busTravelArea is 'entire operator area'
  if (name.toLowerCase() === 'entire operator area')
    name = name.replace(/entire operator/gi, operator); // gi replaces all instaces regardless of lowercase/uppercase chars

  // Return formatted object
  return {
    name,
    busTravelArea,
    description: getBusAreaDescription(busTravelArea, operator),
  };
};

// Does all the heavy lifting of getting unique bus areas and returning them back in a nicely formatted object ({name, busTravelArea, description})
const getUniqueBusAreas = (tickets: Ticket[]) => {
  const arrayOfUniqueBusAreas: ValidArea[] = []; // We use this array to keep track of all unique bus areas

  const removeDuplicateBusAreas = (item: Ticket) => {
    // See if busTravelArea exists in arraOfUniqueBusAreas
    const getIndex = arrayOfUniqueBusAreas.findIndex(
      (x) => x.busTravelArea.toLowerCase() === item.busTravelArea.toLowerCase(),
    );

    // If busTravelArea doesn't exist in our array
    if (getIndex === -1) {
      arrayOfUniqueBusAreas.push(item); // Push the unique into the array (so we don't add it again)
      return item; // Return the whole item as we need it in next step
    }

    return null; // Otherwise the item has already been pushed in as unique, so skip it/return null
  };

  const uniqueBusAreas = tickets.filter(removeDuplicateBusAreas).map(setNewAreaObject);
  return uniqueBusAreas;
};

// Sorts areas into regional or local
const sortAreas = (areas: ValidArea[]) => {
  const regionalAreas = ['west midlands', 'black country', 'entire operator area']; // What is defined as a regional area. Ensure we write as lowercase as that's what we compare against below.

  // Notice the 'local' area filter has a '!' as it is checking if NOT in regionalAreas array (above)
  const sortedAreas = {
    regional: areas.filter(({ busTravelArea }) =>
      regionalAreas.includes(busTravelArea.toLowerCase()),
    ),
    local: areas.filter(
      ({ busTravelArea }) => !regionalAreas.includes(busTravelArea.toLowerCase()),
    ),
  };

  // Return sorted Areas object.
  return sortedAreas;
};

// Get valid bus areas for users chosen filters
const useGetValidBusAreas = (tickets: Ticket[] | null) => {
  // If no tickets found then return a blank array for regional and local areas as we have nothing to check on
  if (!tickets)
    return {
      regional: [],
      local: [],
    };

  // Otherwise...
  const uniqueBusAreas = getUniqueBusAreas(tickets); // Get unique bus areas and create an object from them ({name, busTravelArea, description})
  const validBusAreas = sortAreas(uniqueBusAreas); // Then sort the unique bus areas objects into local/regionals

  return validBusAreas;
};

export default useGetValidBusAreas;
