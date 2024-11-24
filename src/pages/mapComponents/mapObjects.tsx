export const filterItems: string[] = ['tag', 'climber'];

export const ropeClimbingGrades: string[] = [
  '5.0',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10a',
  '5.10b',
  '5.10c',
  '5.10d',
  '5.11a',
  '5.11b',
  '5.11c',
  '5.11d',
  '5.12a',
  '5.12b',
  '5.12c',
  '5.12d',
  '5.13a',
  '5.13b',
  '5.13c',
  '5.13d',
  '5.14a',
  '5.14b',
  '5.14c',
  '5.14d',
  '5.15a',
  '5.15b',
  '5.15c',
  '5.15d',
];

export const boulderingClimbingGrades = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
  'V13',
  'V14',
  'V15',
  'V16',
];

export const friendsOnMapExample = [
  {
    id: 1,
    firstName: 'Liam',
    lastName: 'Brown',
    email: 'liam.brown@example.com',
    userName: 'liamthelion',
  },
  {
    id: 5,
    firstName: 'Elijah',
    lastName: 'Smith',
    email: 'elijah.smith@example.com',
    userName: 'elirunner',
  },
  {
    id: 3,
    firstName: 'Noah',
    lastName: 'Williams',
    email: 'noah.wills@example.com',
    userName: 'noahwave',
  },
  {
    id: 2,
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@example.com',
    userName: 'emmajay',
  },
  {
    id: 6,
    firstName: 'Ava',
    lastName: 'Miller',
    email: 'ava.miller@example.com',
    userName: 'avamuse',
  },
];

export const climbType: Array<string> = ['Rock', 'Boulder', 'All'];

export const climbTypeForFilter: Array<string> = ['Rock', 'Boulder', 'None'];
export const usStateAbbreviations: string[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const usStateDictionary: { [key: string]: string } = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

export const filterTypes: string[] = [
  'Order Route DESC',
  'Order Route ASC',
  'Order Grade ASC',
  'Order Grade DESC',
];

export const tagsObject = [
  { id: 1, tag: 'crimp' },
  { id: 2, tag: 'jug' },
  { id: 3, tag: 'dyno' },
  { id: 4, tag: 'sloper' },
  { id: 5, tag: 'beta' },
];

export const exampleTagOnClimb = [
  { id: 1, tag: 'crimp', climbID: '118299770' },
  { id: 1, tag: 'crimp', climbID: '106050599' },
  { id: 1, tag: 'crimp', climbID: '110103763' },
  { id: 1, tag: 'crimp', climbID: '118571310' },
  { id: 1, tag: 'crimp', climbID: '111130499' },
  { id: 2, tag: 'jug', climbID: '118299770' },
  { id: 2, tag: 'jug', climbID: '106050599' },
  { id: 2, tag: 'jug', climbID: '110103763' },
  { id: 2, tag: 'jug', climbID: '118571310' },
  { id: 2, tag: 'jug', climbID: '111130499' },
];

export const micah = {
  name: 'Micah',
  id: 1,
  email: 'micahphlps@gmail.com',
  userName: 'phelpsm4',
};

export const conversation = [
  { name: 'Micah', message: 'Hey everyone, how’s it going?' },
  {
    name: 'Theresa',
    message: 'Pretty good! Just finished a big project at work. How about you?',
  },
  {
    name: 'Ben',
    message:
      'I’m doing well, just enjoying the weekend. What project were you working on, Theresa?',
  },
  {
    name: 'Theresa',
    message:
      'It was a website redesign for a client. Took a lot longer than expected, but it’s finally done!',
  },
  {
    name: 'Micah',
    message:
      'Congrats on finishing it, Theresa! That must feel like a big relief.',
  },
  {
    name: 'Theresa',
    message: 'Definitely! Thanks, Micah. Any plans for the weekend?',
  },
  {
    name: 'Ben',
    message:
      'I’m thinking of going hiking tomorrow if the weather’s good. You guys interested?',
  },
  {
    name: 'Micah',
    message: 'I’m down! Been wanting to get out and stretch my legs.',
  },
  {
    name: 'Theresa',
    message: 'Sounds like fun! Count me in if I’m not too tired.',
  },
  {
    name: 'Ben',
    message: 'Awesome! Let’s meet up in the morning then. Can’t wait!',
  },
];

export const testData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.9022, 47.4773],
      },
      properties: {
        climbs: [
          {
            id: '106050599',
            climber_names: ['corey'],
            name: 'North Ridge',
            grade: '5.9 5c 17 VI 17 HVS 5a',
            tags: [],
            conversation: conversation,
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.9108, 48.48291],
      },
      properties: {
        climbs: [
          {
            id: '110103763',
            climber_names: ['corey'],
            name: 'Northeast Buttress',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
            tags: [],
            conversation: conversation,
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.65485, 48.19575],
      },
      properties: {
        climbs: [
          {
            id: '118571310',
            climber_names: ['corey'],
            name: 'Western Dihedral',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
            tags: [],
            conversation: conversation,
          },
          {
            id: '118299770',
            climber_names: ['corey'],
            name: 'Concerto in C for Drill and Hammer',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
            tags: [],
            conversation: conversation,
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.51801, 48.01293],
      },
      properties: {
        climbs: [
          {
            id: '111130499',
            climber_names: ['corey'],
            name: 'Ragged Edge',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
            tags: [],
            conversation: conversation,
          },
          {
            id: '111956810',
            climber_names: ['corey'],
            name: 'True Grit',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
            tags: [],
            conversation: conversation,
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.65513, 48.51216],
      },
      properties: {
        climbs: [
          {
            id: '106378815',
            climber_names: ['corey', 'theresa'],
            name: 'South Arete',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
            tags: [],
            conversation: conversation,
          },
          {
            id: '106416669',
            climber_names: ['corey', 'theresa'],
            name: 'Southwest Rib',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
            tags: [],
            conversation: [],
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.15602, 49.93556],
      },
      properties: {
        climbs: [
          {
            id: '108370377',
            climber_names: ['corey'],
            name: 'Western Harlot',
            grade: '5.9 5c 17 VI 17 HVS 5a',
            tags: [],
            conversation: [],
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.16038, 49.91193],
      },
      properties: {
        climbs: [
          {
            id: '117688156',
            climber_names: ['corey'],
            name: 'Ursa Minor',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
            tags: [],
            conversation: [],
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.14798, 49.84226],
      },
      properties: {
        climbs: [
          {
            id: '110111202',
            climber_names: ['corey'],
            name: 'Attachment Theory',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
            tags: [],
            conversation: [],
          },
        ],
        total_climbers: 2,
      },
    },
  ],
};
