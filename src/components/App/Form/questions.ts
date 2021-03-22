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
        text: 'National Express West Midlands',
        value: 'NXWM',
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
  busAreas: {
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
        name: 'firstClass',
        text: 'Yes',
        value: 'yes',
      },
      {
        name: 'firstClass',
        text: 'No',
        value: 'no',
      },
    ],
  },
};

export default questions;
