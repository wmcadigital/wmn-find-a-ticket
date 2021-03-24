const questions: { [key: string]: any } = {
  busNetwork: {
    question: 'Do you want to travel on any bus?',
    hint: 'Travel on any bus company in the West Midlands Network',
    options: [
      { text: 'Yes', value: 'yes' },
      { text: 'No', value: 'no' },
    ],
  },
  busCompany: {
    question: 'Which bus company do you want to travel with?',
    hint: 'Please choose a company',
    options: [
      {
        text: 'A & M Group',
        value: 'AMG',
      },
      {
        text: 'Arriva Fox County',
        value: 'AFC',
      },
      {
        text: 'Arriva Midlands',
        value: 'AMN',
      },
      {
        text: 'Chaserider',
        value: 'CRD',
      },
      {
        text: 'D & G Bus',
        value: 'DGC',
      },
      {
        text: 'Diamond Bus',
        value: 'DIA',
      },
      {
        text: 'First Bus Potteries',
        value: 'NXB',
      },
      {
        text: "Johnson's Excelbus",
        value: 'JOH',
      },
      {
        text: 'LandFlight',
        value: 'SIL',
      },
      {
        text: "Let's Go!",
        value: 'SIL',
      },
      {
        text: 'Lilbourne Community Minibus',
        value: 'LCM',
      },
      {
        text: 'Midland Classic',
        value: 'MDC',
      },
      {
        text: 'National Express Coventry',
        value: 'TCV',
      },
      {
        text: 'National Express West Midlands',
        value: 'PMT',
      },
      {
        text: 'NN Cresswell',
        value: 'CWL',
      },
      {
        text: 'Roberts Travel',
        value: 'RTS',
      },
      {
        text: 'Stagecoach Midlands',
        value: 'SMR',
      },
      {
        text: 'Trent Barton',
        value: 'TRN',
      },
      {
        text: 'Wyre Forest Dial a Ride',
        value: 'WFD',
      },
    ],
  },
  traveller: {
    question: 'Who will be travelling?',
    options: [
      { text: 'Adult', value: 'adult' },
      { text: 'Young person (5-18)', value: 'youngPerson' },
      { text: 'Student (16+)', value: 'student' },
      { text: 'Group or Family', value: 'group' },
      { text: 'Older person', value: 'senior' },
      { text: 'Disabled person', value: 'disabled' },
    ],
  },
  busArea: {
    question: 'Select your bus area',
    options: [
      {
        html: '<strong>West Midlands</strong><br> From £64.00*',
        text: 'West Midlands',
        value: 'westmidlands',
        group: 'region',
      },
      {
        html: '<strong>Black Country</strong><br> From £55.50*',
        text: 'Black Country',
        value: 'blackcountry',
        group: 'region',
      },
      {
        html: '<strong>Coventry</strong><br> From £53.00*',
        text: 'Coventry',
        value: 'coventry',
        group: 'local',
      },
      {
        html: '<strong>Sandwell and Dudley</strong><br> From £40.00*',
        text: 'Sandwell and Dudley',
        value: 'sandwelldudley',
        group: 'local',
      },
      {
        html: '<strong>Walsall</strong><br> From £40.00*',
        text: 'Walsall',
        value: 'walsall',
        group: 'local',
      },
    ],
  },
  railZones: {},
  travelTime: {
    question: 'Will you travel during peak hours?',
    hint: 'Sometimes you can get a cheaper ticket if you only travel after 9.30am.',
    options: [
      {
        html: '<strong>Peak</strong><br>I need to travel before 9.30am',
        text: 'Peak',
        value: 'peak',
      },
      {
        html: '<strong>Off-peak</strong><br>I will only travel after 9.30am',
        text: 'Off peak',
        value: 'offpeak',
      },
      {
        html:
          '<strong>Disabled or Older Person’s pass holder</strong><br>I need to travel before 9.30am ',
        text: 'Disabled or Older Person’s pass holder',
        value: 'senior',
      },
    ],
  },
  firstClass: {
    question: 'Do you want to sit in first class?',
    hint:
      'First class is only available on CrossCountry, Avanti West Coast and some London Northwestern trains.',
    options: [
      {
        text: 'Yes',
        value: 'yes',
      },
      {
        text: 'No',
        value: 'no',
      },
    ],
  },
  ticketDuration: {
    question: 'How long do you need your ticket to last?',
    hint: 'Select the ticket duration below.',
    options: [
      {
        text: '1 week',
        totalPrice: '25.90',
        dailyPrice: '3.70',
        value: '1week',
      },
      {
        text: '28 days',
        totalPrice: '87.50',
        dailyPrice: '3.12',
        value: '28days',
      },
      {
        text: 'Monthly Direct Debit',
        totalPrice: '70.20',
        dailyPrice: '2.34',
        value: 'directDebit',
      },
      {
        text: '52 weeks',
        totalPrice: '843.00',
        dailyPrice: '2.32',
        value: '52weeks',
      },
    ],
  },
};

export default questions;
