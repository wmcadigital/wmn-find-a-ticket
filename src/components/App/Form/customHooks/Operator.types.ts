export interface PostalAddress {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  postcode: string;
}
export interface Operator {
  id: string;
  modified: Date;
  name: string;
  type: string;
  telephone: string;
  shortCode: string;
  website: string;
  postalAddress: PostalAddress;
  timetableUrl: string;
  acceptPayg: boolean;
  acceptnBus: boolean;
  acceptnNetwork: boolean;
  acceptnTrain: boolean;
  buyOnboard: boolean;
  ticketRestrictions: string;
  swiftFares: string;
  payGInformation: string;
}
