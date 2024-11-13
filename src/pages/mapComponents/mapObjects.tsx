interface State {
  name: string;
  abbreviation: string;
}

export const climbType: Array<string> = [
  'Rock',
  'Boulder',
  'Aid',
  'Ice',
  'Mix',
  'Alpine',
];

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

export const usStates: Array<State> = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
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
