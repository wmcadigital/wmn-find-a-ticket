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
        text: '<strong>West Midlands</strong><br> From £64.00*',
        value: 'westmidlands',
        group: 'region',
      },
      {
        text: '<strong>Black Country</strong><br> From £55.50*',
        value: 'blackcountry',
        group: 'region',
      },
      {
        text: '<strong>Coventry</strong><br> From £53.00*',
        value: 'coventry',
        group: 'local',
      },
      {
        text: '<strong>Sandwell and Dudley</strong><br> From £40.00*',
        value: 'sandwelldudley',
        group: 'local',
      },
      {
        text: '<strong>Walsall</strong><br> From £40.00*',
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
        text: '<strong>Peak</strong><br>I need to travel before 9.30am',
        value: 'peak',
      },
      {
        text: '<strong>Off-peak</strong><br>I will only travel after 9.30am',
        value: 'offpeak',
      },
      {
        text:
          '<strong>Disabled or Older Person’s pass holder</strong><br>I need to travel before 9.30am ',
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
