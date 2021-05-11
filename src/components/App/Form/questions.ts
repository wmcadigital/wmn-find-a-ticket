/* eslint-disable prettier/prettier */
const questions = {
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
        value: 'A & M Group',
      },
      {
        text: 'Arriva Fox County',
        value: 'Arriva Fox County',
      },
      {
        text: 'Arriva Midlands',
        value: 'Arriva Midlands',
      },
      {
        text: 'Chaserider',
        value: 'Chaserider',
      },
      {
        text: 'D & G Bus',
        value: 'D & G Bus',
      },
      {
        text: 'Diamond Bus',
        value: 'Diamond Bus',
      },
      {
        text: 'First Bus Potteries',
        value: 'First Bus Potteries',
      },
      {
        text: "Johnson's Excelbus",
        value: "Johnson's Excelbus",
      },
      {
        text: 'LandFlight',
        value: 'LandFlight',
      },
      {
        text: "Let's Go!",
        value: "Let's Go!",
      },
      {
        text: 'Lilbourne Community Minibus',
        value: 'Lilbourne Community Minibus',
      },
      {
        text: 'Midland Classic',
        value: 'Midland Classic',
      },
      {
        text: 'National Express Coventry',
        value: 'National Express Coventry',
      },
      {
        text: 'National Express West Midlands',
        value: 'National Express West Midlands',
      },
      {
        text: 'NN Cresswell',
        value: 'NN Cresswell',
      },
      {
        text: 'Roberts Travel',
        value: 'Roberts Travel',
      },
      {
        text: 'Stagecoach Midlands',
        value: 'Stagecoach Midlands',
      },
      {
        text: 'Trent Barton',
        value: 'Trent Barton',
      },
      {
        text: 'Wyre Forest Dial a Ride',
        value: 'Wyre Forest Dial a Ride',
      },
    ],
  },
  traveller: {
    question: 'Who will be travelling?',
    options: [
      { text: 'Adult', value: 'adult' },
      {
        text: 'Young person (5-18)',
        value: 'youngPerson',
        info: 'If you&rsquo;re over 16, you need a <a href="https://wmnetwork.co.uk/swift/swift-for-you/16-18-photocard/" target="_blank" rel="nofollow">16-18</a> or <a href="https://wmnetwork.co.uk/swift/swift-for-you/student-season-tickets/" target="_blank" rel="nofollow">student Swift card</a>. If you look older than 16, you&rsquo;ll need to prove your age.',
      },
      {
        text: 'Student (16+)',
        value: 'student',
        info: 'You need a student Swift card. If you can&rsquo;t get one, you&rsquo;ll need a <a href="https://wmnetwork.co.uk/swift/swift-for-you/16-18-photocard/" target="_blank" rel="nofollow">16-18 Swift card</a> or pay adult fare.',
      },
      {
        text: 'Group or Family',
        value: 'family',
      },
      {
        text: 'Older person',
        value: 'concessionary',
        info: 'If you have a <a href="https://www.wmnetwork.co.uk/tickets-and-swift/discounts-and-free-travel-passes/older-persons-pass/" target="_blank" rel="nofollow">WMCA older person&rsquo;s pass</a>, you only need a ticket to travel before 9.30am on weekdays.',
      },
      {
        text: 'Disabled person',
        value: 'disabled',
        info: 'If you have a <a href="https://www.wmnetwork.co.uk/tickets-and-swift/discounts-and-free-travel-passes/disabled-persons-pass/" target="_blank" rel="nofollow">WMCA disabled person&rsquo;s pass</a>, you only need a ticket to travel before 9.30am on weekdays.',
      },
    ],
  },
  busArea: {
    question: 'Select your bus area',
    options: [
      {
        html: '<strong>West Midlands</strong> Whole region, including Birmingham and Solihull',
        text: 'West Midlands',
        value: 'West Midlands',
        group: 'region',
      },
      {
        html: '<strong>Black Country</strong> Sandwell and Dudley, Walsall and Wolverhampton',
        text: 'Black Country',
        value: 'Black Country',
        group: 'region',
      },
      {
        html: 'Coventry',
        text: 'Coventry',
        value: 'Coventry',
        group: 'local',
      },
      {
        html: 'Sandwell and Dudley',
        text: 'Sandwell and Dudley',
        value: 'Sandwell & Dudley',
        group: 'local',
      },
      {
        html: 'Walsall',
        text: 'Walsall',
        value: 'Walsall',
        group: 'local',
      },
    ],
  },
  stations: {
    question: 'Which train stations will you use?',
    options: [],
  },
  railZones: {
    question: 'Select your rail zones',
    options: [
      {
        text: 'Yes',
        value: 'yes',
      },
    ],
  },
  travelTime: {
    question: 'Will you travel during peak hours?',
    hint: 'Sometimes you can get a cheaper ticket if you only travel after 9.30am.',
    options: [
      {
        html: '<strong>Peak</strong> I need to travel before 9.30am',
        text: 'Peak',
        value: 'peak',
      },
      {
        html: '<strong>Off-peak</strong> I will only travel after 9.30am',
        text: 'Off peak',
        value: 'offpeak',
      },
      {
        html: '<strong>Disabled or Older Person’s pass holder</strong> I need to travel before 9.30am ',
        text: 'Disabled or Older Person’s pass holder',
        value: 'senior',
        info: 'As a disabled or older person’s pass holder, you get free travel after 9.30am on weekdays and all weekend. You only need a ticket if you need to regularly travel before 9.30am.',
      },
    ],
  },
  firstClass: {
    question: 'Do you want to sit in first class?',
    hint: 'First class is only available on CrossCountry, Avanti West Coast and some London Northwestern trains.',
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
  multiDay: {
    question: 'How many 1 day tickets do you need?',
    hint: 'Multi-day tickets are bundles of 5, 10 or 15 day tickets. You activate a ticket when you tap in and can use it all day.',
    options: [],
  },
};

export default questions;
