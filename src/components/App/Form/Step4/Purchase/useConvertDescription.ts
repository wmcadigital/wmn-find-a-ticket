import arrayToSentence from '../../helpers/arrayToSentence';
import railData from '../../Step2/RailZone/RailData.json';

const useConvertDescription = () => {
  const convertTemplate = (string: string, obj: any) => {
    let str = string;
    Object.keys(obj).forEach((prop: any) => {
      str = str.replace(new RegExp(`{${prop}}`, 'g'), obj[prop]);
    });
    return str;
  };

  const formatDate = (date: string) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const newDate = date.slice(0, 10).split('-').reverse();
    newDate[1] = months[parseInt(newDate[1], 10) - 1];
    return newDate.join(' ');
  };

  const convertDescription = (description: string, ticket: any) => {
    let convertedDescription = description;
    const modes = [
      ticket.allowBus && 'bus',
      ticket.allowTrain && 'train',
      ticket.allowMetro && 'tram',
    ].filter((mode) => mode);
    const excludedDestinations = railData.railStationAccess
      .filter((stn) => stn.railZone && stn.railZone > ticket.railZoneTo)
      .map((stn) => stn.stationName);

    const variables: {
      modes: string;
      otherModes: string;
      duration: string;
      railZone?: string;
      outOfCountyStation?: string;
      operatorName?: string;
      startDate?: string;
      endDate?: string;
      destinations?: string;
    } = {
      modes: arrayToSentence(modes),
      otherModes: arrayToSentence(['bus', 'tram', 'train'].filter((mode) => !modes.includes(mode))),
      duration: `${ticket.validityDays} days`,
      railZone:
        ticket.railZoneFrom === ticket.railZoneTo
          ? ticket.railZoneFrom
          : `${ticket.railZoneFrom} to ${ticket.railZoneTo}`,
      outOfCountyStation: ticket.station,
      operatorName: ticket.operator,
      startDate: formatDate(ticket.termStartDate),
      endDate: formatDate(ticket.termEndDate),
      destinations: arrayToSentence(excludedDestinations.slice(0, 3)),
    };
    convertedDescription = convertTemplate(description, variables);

    return convertedDescription;
  };

  return { convertDescription, convertTemplate };
};

export default useConvertDescription;
