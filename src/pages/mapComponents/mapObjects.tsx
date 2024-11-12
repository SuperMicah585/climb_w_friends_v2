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

export const tagsObject =[
  { id: 1, tag: 'crimp' },
  { id: 2, tag: 'jug' },
  { id: 3, tag: 'dyno' },
  { id: 4, tag: 'sloper' },
  { id: 5, tag: 'beta' }
]

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
          },
          {
            id: '118299770',
            climber_names: ['corey'],
            name: 'Concerto in C for Drill and Hammer',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
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
          },
          {
            id: '111956810',
            climber_names: ['corey'],
            name: 'True Grit',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
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
          },
          {
            id: '106416669',
            climber_names: ['corey', 'theresa'],
            name: 'Southwest Rib',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
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
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.45532, 47.446475],
      },
      properties: {
        climbs: [
          {
            id: '124432683',
            climber_names: ['corey'],
            name: 'The Edge of Time Arete',
            grade: '5.9+ 5c 17 VI 17 E1 5a',
          },
          {
            id: '106378880',
            climber_names: ['theresa'],
            name: 'South Face',
            grade: '5.4 4a 12 IV 10 VD 3c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.48941, 48.00992],
      },
      properties: {
        climbs: [
          {
            id: '112553808',
            climber_names: ['corey', 'theresa'],
            name: 'Mile High Club',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '119290727',
            climber_names: ['corey'],
            name: 'Beyond Redlining',
            grade: '5.10+ 6b+ 21 VII+ 20 E3 5b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.77702, 47.57284],
      },
      properties: {
        climbs: [
          {
            id: '105793190',
            climber_names: ['corey', 'theresa'],
            name: 'Condorphamine Addiction',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.05894, 48.51169],
      },
      properties: {
        climbs: [
          {
            id: '112030839',
            climber_names: ['corey'],
            name: 'Northwest Face',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '106450596',
            climber_names: ['corey'],
            name: 'West Ridge',
            grade: '5.6 4c 14 V 12 S 4b Mod. Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.46235, 48.63318],
      },
      properties: {
        climbs: [
          {
            id: '124334678',
            climber_names: ['corey'],
            name: 'Earl Grey',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-74.179, 41.74421],
      },
      properties: {
        climbs: [
          {
            id: '105798994',
            climber_names: ['corey'],
            name: 'High Exposure',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '110476038',
            climber_names: ['corey'],
            name: 'Roofy Direct',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '108425035',
            climber_names: ['corey'],
            name: "Rachel's Crack",
            grade: '5.8- 5b 16 VI- 14 VS 4c',
          },
          {
            id: '113562866',
            climber_names: ['corey'],
            name: 'Jimmy Up!',
            grade: 'V1 5',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-74.16593333333334, 41.14482],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.31552, 47.56445],
      },
      properties: {
        climbs: [
          {
            id: '111020298',
            climber_names: ['corey'],
            name: 'South Corner',
            grade: '5.3 3+ 10 III 9 VD 3a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.72288, 47.54256],
      },
      properties: {
        climbs: [
          {
            id: '107352608',
            climber_names: ['corey'],
            name: 'The Hueco Route',
            grade: 'V1 5',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '109578862',
            climber_names: ['corey'],
            name: 'Sacrilege',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '107199601',
            climber_names: ['corey'],
            name: 'The Neutered Bovine',
            grade: '5.11c 6c+ 24 VIII- 24 E4 6a',
          },
          {
            id: '106006027',
            climber_names: ['corey'],
            name: 'Cupola Rebuff',
            grade: '5.11b 6c 23 VIII- 23 E3 5c',
          },
          {
            id: '106006012',
            climber_names: ['corey'],
            name: 'Kigijiushi',
            grade: '5.10c 6b 20 VII 20 E2 5b',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-123.15601, 49.90616666666667],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.147795, 44.364435],
      },
      properties: {
        climbs: [
          {
            id: '106782760',
            climber_names: ['corey'],
            name: 'Lost in Space',
            grade: '5.10b/c 6b 20 VII 20 E2 5b',
          },
          {
            id: '105821077',
            climber_names: ['corey'],
            name: 'Wherever I May Roam',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '106192768',
            climber_names: ['corey'],
            name: 'Sky Chimney',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.12285, 44.3711],
      },
      properties: {
        climbs: [
          {
            id: '107341167',
            climber_names: ['corey'],
            name: 'Birds in a Rut',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.18081, 47.56488],
      },
      properties: {
        climbs: [
          {
            id: '122686127',
            climber_names: ['corey'],
            name: 'Southeast Ridge',
            grade: '3rd 1- 1 I 1 M 1a Mod. Snow PG13',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-116.14002, 33.99446],
      },
      properties: {
        climbs: [
          {
            id: '105721810',
            climber_names: ['corey'],
            name: 'Right On',
            grade: '5.6 4c 14 V 12 S 4b PG13',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-116.163, 34.0148],
      },
      properties: {
        climbs: [
          {
            id: '105721654',
            climber_names: ['corey'],
            name: 'The Flake',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-116.17782, 34.02386],
      },
      properties: {
        climbs: [
          {
            id: '105721969',
            climber_names: ['corey'],
            name: 'White Lightning',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-116.16637, 34.01109],
      },
      properties: {
        climbs: [
          {
            id: '107097645',
            climber_names: ['corey'],
            name: 'Easy Day',
            grade: '5.4 4a 12 IV 10 VD 3c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.14949, 44.36266],
      },
      properties: {
        climbs: [
          {
            id: '111930553',
            climber_names: ['corey'],
            name: 'Sunset Boulevard',
            grade: '5.7+ 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.14564, 44.3665],
      },
      properties: {
        climbs: [
          {
            id: '105804014',
            climber_names: ['corey'],
            name: 'Lycopodophyta',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '106154363',
            climber_names: ['corey'],
            name: 'Bunny Face',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '111859955',
            climber_names: ['corey', 'theresa'],
            name: 'Wild Turkey',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '107527007',
            climber_names: ['theresa'],
            name: 'An Act of Strange Boar',
            grade: '5.10d 6b+ 21 VII+ 21 E3 5b',
          },
          {
            id: '107561152',
            climber_names: ['theresa'],
            name: 'A Group of Mysteries of Frenchwoman',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '124937891',
            climber_names: ['theresa'],
            name: 'Here’s Buzz Aldrin’s Plan to Col…',
            grade: '5.6 4c 14 V 12 S 4b',
          },
          {
            id: '124107101',
            climber_names: ['theresa'],
            name: 'Cloudbeams',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '122617260',
            climber_names: ['theresa'],
            name: 'Steel Pulse (short pitch)',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '122936082',
            climber_names: ['theresa'],
            name: 'That Night, the Mountain Grew',
            grade: '5.7+ 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '106004538',
            climber_names: ['theresa'],
            name: 'Battered Sandwich',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '108154702',
            climber_names: ['theresa'],
            name: "Leeper's Z Corner",
            grade: '5.7+ 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '122751727',
            climber_names: ['theresa'],
            name: 'Life on Pi?',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '122604039',
            climber_names: ['theresa'],
            name: 'Oyaji Milkman Loves the Sea',
            grade: '5.7+ 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '122603709',
            climber_names: ['theresa'],
            name: 'More than 24 Dandelions',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '108138661',
            climber_names: ['theresa'],
            name: 'R. O. U. S.',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-121.55807, 47.825],
            [-121.561, 47.8253],
            [-121.55801, 47.82584],
            [-121.55725, 47.82545],
            [-121.55807, 47.825],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.86449, 44.23598],
      },
      properties: {
        climbs: [
          {
            id: '107000832',
            climber_names: ['corey'],
            name: 'Great Chimney',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.89821, 44.43051],
      },
      properties: {
        climbs: [
          {
            id: '107789865',
            climber_names: ['corey'],
            name: "Captain's Crack (Exotic Nut Sele…",
            grade: '5.8- 5b 16 VI- 14 VS 4c PG13',
          },
          {
            id: '107582327',
            climber_names: ['corey'],
            name: 'Noises in the Night',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '113534628',
            climber_names: ['corey'],
            name: 'Persistence',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.91031, 44.38535],
      },
      properties: {
        climbs: [
          {
            id: '106083774',
            climber_names: ['corey'],
            name: 'Hush, Mama Thrush',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '106957126',
            climber_names: ['corey'],
            name: 'Harvest Moon',
            grade: '5.8- 5b 16 VI- 14 VS 4c R',
          },
          {
            id: '121150543',
            climber_names: ['corey'],
            name: 'In the Pines Direct',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.84965, 44.38995],
      },
      properties: {
        climbs: [
          {
            id: '114471102',
            climber_names: ['corey'],
            name: 'White Course',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.85837000000001, 44.370915],
      },
      properties: {
        climbs: [
          {
            id: '116526853',
            climber_names: ['corey'],
            name: 'Seven Cruxes',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '125068841',
            climber_names: ['corey'],
            name: 'Solution Problem',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.85311, 44.38487],
      },
      properties: {
        climbs: [
          {
            id: '119674176',
            climber_names: ['corey'],
            name: 'Which Side Are You On?',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.90266, 44.40531],
      },
      properties: {
        climbs: [
          {
            id: '122965682',
            climber_names: ['corey'],
            name: "Ship's Prow",
            grade: 'V0-1 4+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-74.18693, 41.73755],
      },
      properties: {
        climbs: [
          {
            id: '105920873',
            climber_names: ['corey'],
            name: 'Betty',
            grade: '5.3 3+ 10 III 9 VD 3a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.7429, 44.1361],
      },
      properties: {
        climbs: [
          {
            id: '106411030',
            climber_names: ['corey'],
            name: 'Regular Route',
            grade: '5.5 4b 13 IV+ 11 MS 4a PG13',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.71403, 44.20791],
      },
      properties: {
        climbs: [
          {
            id: '111981379',
            climber_names: ['corey'],
            name: 'Best Ice Route in the Philippines',
            grade: 'WI4+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.87577, 47.78284],
      },
      properties: {
        climbs: [
          {
            id: '120311109',
            climber_names: ['corey'],
            name: 'Slushfest',
            grade: 'WI4',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-119.1536, 47.81441],
      },
      properties: {
        climbs: [
          {
            id: '116583737',
            climber_names: ['corey'],
            name: 'Road Side Pillar Below Emerald',
            grade: 'WI4+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.75522, 44.14234],
      },
      properties: {
        climbs: [
          {
            id: '106670026',
            climber_names: ['corey'],
            name: 'White Line Fever',
            grade: 'WI3',
          },
          {
            id: '105962813',
            climber_names: ['corey'],
            name: 'Power Play',
            grade: 'WI5-',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.631045, 47.43555],
      },
      properties: {
        climbs: [
          {
            id: '120004500',
            climber_names: ['corey'],
            name: "Jenn's Inflatable Funhouse",
            grade: '5.7 5a 15 V+ 13 MVS 4b M3+',
          },
          {
            id: '105853976',
            climber_names: ['theresa'],
            name: 'I Wanna Go Home',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.96688, 44.13347],
      },
      properties: {
        climbs: [
          {
            id: '107126372',
            climber_names: ['corey'],
            name: 'The Trap Dike',
            grade: 'WI2 Easy Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.61843, 44.18568],
      },
      properties: {
        climbs: [
          {
            id: '123811316',
            climber_names: ['corey'],
            name: 'Hammer Time',
            grade: 'WI2-3 M1',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-107.5666, 37.8808],
      },
      properties: {
        climbs: [
          {
            id: '105905603',
            climber_names: ['corey'],
            name: 'Whorehouse Hoses',
            grade: 'WI4-5',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.87899, 44.40439],
      },
      properties: {
        climbs: [
          {
            id: '106263345',
            climber_names: ['corey'],
            name: 'Chiller Pillar',
            grade: 'WI4',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.61444, 47.84434],
      },
      properties: {
        climbs: [
          {
            id: '120990491',
            climber_names: ['corey'],
            name: 'hotanimemoms.biz',
            grade: 'V2+ 5+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '105795744',
            climber_names: ['corey'],
            name: 'Party in Your Pants',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '107442256',
            climber_names: ['theresa'],
            name: 'Chimney Divine',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
          },
          {
            id: '107105422',
            climber_names: ['theresa'],
            name: 'Justified Ancients of Mu Mu',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '106399178',
            climber_names: ['theresa'],
            name: 'The Chossmaster',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-119.97333, 47.02288],
            [-119.97494, 47.0231],
            [-119.97212, 47.02349],
            [-119.97333, 47.02288],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-74.19626, 41.73294],
      },
      properties: {
        climbs: [
          {
            id: '105800391',
            climber_names: ['corey'],
            name: 'Yum Yum Yab Yum',
            grade: '5.4 4a 12 IV 10 VD 3c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.69824, 44.21347],
      },
      properties: {
        climbs: [
          {
            id: '107806494',
            climber_names: ['corey'],
            name: 'Figaro',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '107856073',
            climber_names: ['corey'],
            name: 'Day of Madness',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.82303, 44.24788],
      },
      properties: {
        climbs: [
          {
            id: '108135968',
            climber_names: ['corey'],
            name: 'Owl Crack',
            grade: '5.6 4c 14 V 12 S 4b PG13',
          },
          {
            id: '124613258',
            climber_names: ['corey'],
            name: 'Smoke on the Water',
            grade: '5.9+ 5c 17 VI 17 E1 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.75802, 44.14472],
      },
      properties: {
        climbs: [
          {
            id: '106488535',
            climber_names: ['corey'],
            name: 'CWI',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-72.861535, 44.378659999999996],
      },
      properties: {
        climbs: [
          {
            id: '111836428',
            climber_names: ['corey'],
            name: 'Connors Cave',
            grade: '5.4 4a 12 IV 10 VD 3c',
          },
          {
            id: '111195376',
            climber_names: ['corey'],
            name: 'Han Shot First',
            grade: '5.10b/c 6b 20 VII 20 E2 5b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.14493, 49.68766],
      },
      properties: {
        climbs: [
          {
            id: '106776367',
            climber_names: ['corey'],
            name: 'South Arete',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.15643, 49.910214999999994],
      },
      properties: {
        climbs: [
          {
            id: '107706905',
            climber_names: ['corey'],
            name: 'Instant Classic',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '105962600',
            climber_names: ['corey'],
            name: 'Junkyard Patio',
            grade: '5.11a 6c 22 VII+ 22 E3 5c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.1675, 49.924],
      },
      properties: {
        climbs: [
          {
            id: '126210957',
            climber_names: ['corey'],
            name: "Indra's Net",
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '107104796',
            climber_names: ['theresa'],
            name: 'Star Chek',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.15689, 49.67242],
      },
      properties: {
        climbs: [
          {
            id: '108503837',
            climber_names: ['corey'],
            name: 'The Relish Route',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.32049, 47.56061],
      },
      properties: {
        climbs: [
          {
            id: '124501856',
            climber_names: ['corey'],
            name: 'The Fin--Northeast Face',
            grade: '5.4 4a 12 IV 10 VD 3c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.71086, 47.80136],
      },
      properties: {
        climbs: [
          {
            id: '109143016',
            climber_names: ['corey'],
            name: 'Blue Glacier',
            grade: 'Easy 5th 1+ 3 I 5 M 1c Mod. Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.70119, 46.74591],
      },
      properties: {
        climbs: [
          {
            id: '117385955',
            climber_names: ['corey'],
            name: 'Classic Route',
            grade: '5.4 4a 12 IV 10 VD 3c Easy Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.95126, 47.16535],
      },
      properties: {
        climbs: [
          {
            id: '106709341',
            climber_names: ['corey'],
            name: 'Skookum Falls',
            grade: 'WI4+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.41827, 47.45877],
      },
      properties: {
        climbs: [
          {
            id: '107493225',
            climber_names: ['corey'],
            name: 'New York Gully',
            grade: '5.8 5b 16 VI- 15 HVS 4c WI3 M5- A1-2 Steep Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.02195, 45.62763],
      },
      properties: {
        climbs: [
          {
            id: '110737394',
            climber_names: ['corey'],
            name: 'Pioneer/Iron Spike Route',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.52878, 48.85723],
      },
      properties: {
        climbs: [
          {
            id: '113515824',
            climber_names: ['corey'],
            name: 'North Face',
            grade: 'Easy Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.92463, 46.32638],
      },
      properties: {
        climbs: [
          {
            id: '110943576',
            climber_names: ['corey', 'theresa'],
            name: 'Wild Wild West',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.71869, 47.52963],
      },
      properties: {
        climbs: [
          {
            id: '105793664',
            climber_names: ['corey', 'theresa'],
            name: 'Outer Space',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.65874, 48.51548],
      },
      properties: {
        climbs: [
          {
            id: '105797867',
            climber_names: ['corey', 'theresa'],
            name: 'Beckey Route (SW Face)',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '108259921',
            climber_names: ['corey', 'theresa'],
            name: 'River Slab',
            grade: 'V3 6A',
          },
          {
            id: '115438028',
            climber_names: ['theresa'],
            name: 'Hittin The Rail',
            grade: 'V5 6C',
          },
          {
            id: '113482487',
            climber_names: ['theresa'],
            name: 'The Tube',
            grade: 'V2 5+',
          },
          {
            id: '116578218',
            climber_names: ['theresa'],
            name: 'Finger Crack',
            grade: 'V3 6A',
          },
          {
            id: '117331168',
            climber_names: ['theresa'],
            name: 'Unnamed',
            grade: 'V3 6A',
          },
          {
            id: '120080611',
            climber_names: ['theresa'],
            name: 'High and Dry',
            grade: 'V4-5 6B+',
          },
          {
            id: '120080661',
            climber_names: ['theresa'],
            name: 'Unemployment Check',
            grade: 'V3 6A',
          },
          {
            id: '116815721',
            climber_names: ['theresa'],
            name: 'The Jewel',
            grade: 'V3 6A',
          },
          {
            id: '122663233',
            climber_names: ['theresa'],
            name: 'The Enigma',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-121.60178666666667, 47.81721666666667],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.59801, 47.81749],
      },
      properties: {
        climbs: [
          {
            id: '126211853',
            climber_names: ['corey'],
            name: 'DUPLO left',
            grade: 'V2 5+',
          },
          {
            id: '109177010',
            climber_names: ['corey', 'theresa'],
            name: 'Leggo Arete',
            grade: 'V2- 5+',
          },
          {
            id: '114425314',
            climber_names: ['theresa'],
            name: 'Chinook',
            grade: 'V3 6A',
          },
          {
            id: '114425347',
            climber_names: ['theresa'],
            name: 'Chinook Traverse',
            grade: 'V4- 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.746, 43.76279],
      },
      properties: {
        climbs: [
          {
            id: '111957971',
            climber_names: ['corey'],
            name: 'Lower Highway to Heaven',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.776, 43.835],
      },
      properties: {
        climbs: [
          {
            id: '105823529',
            climber_names: ['corey'],
            name: 'CMC Route',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
          },
          {
            id: '106206525',
            climber_names: ['corey'],
            name: 'No Escape Buttress, West Arete',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '114403313',
            climber_names: ['corey'],
            name: 'Skillet Couloir',
            grade: 'Steep Snow',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.79302, 43.73345],
      },
      properties: {
        climbs: [
          {
            id: '105804852',
            climber_names: ['corey'],
            name: "Irene's Arete",
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.75109499999999, 47.548625],
      },
      properties: {
        climbs: [
          {
            id: '106583471',
            climber_names: ['corey', 'theresa'],
            name: "Bob's 4th Crack",
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '106589180',
            climber_names: ['corey', 'theresa'],
            name: 'Cocaine Crack',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '106583479',
            climber_names: ['theresa'],
            name: "Bob's 6th Crack",
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '112217707',
            climber_names: ['theresa'],
            name: 'Canadians On Horseback',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.14363, 44.37053],
      },
      properties: {
        climbs: [
          {
            id: '105791058',
            climber_names: ['corey'],
            name: 'Pioneer Route',
            grade: '5.7 5a 15 V+ 13 MVS 4b C0',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.46126, 47.36151],
      },
      properties: {
        climbs: [
          {
            id: '124816615',
            climber_names: ['corey'],
            name: "North Face (Ice Cold Zach Daniel's)",
            grade: '5.9+ 5c 17 VI 17 E1 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.42215, 36.14773],
      },
      properties: {
        climbs: [
          {
            id: '114381509',
            climber_names: ['theresa'],
            name: 'Amazing Grace',
            grade: 'V5 6C',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.41099, 36.16154],
      },
      properties: {
        climbs: [
          {
            id: '108551582',
            climber_names: ['theresa'],
            name: 'Umpa Lumpa',
            grade: 'V5 6C',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.412695, 36.163889999999995],
      },
      properties: {
        climbs: [
          {
            id: '114279975',
            climber_names: ['theresa'],
            name: 'Memento Mori',
            grade: 'V4 6B',
          },
          {
            id: '107385804',
            climber_names: ['theresa'],
            name: 'The Pork Chop',
            grade: 'V3 6A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.46059, 36.01573],
      },
      properties: {
        climbs: [
          {
            id: '108022151',
            climber_names: ['theresa'],
            name: 'The Sting',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.48775, 36.10372],
      },
      properties: {
        climbs: [
          {
            id: '105732257',
            climber_names: ['theresa'],
            name: 'Solar Slab',
            grade: '5.6 4c 14 V 12 S 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.46364, 36.00632],
      },
      properties: {
        climbs: [
          {
            id: '118291537',
            climber_names: ['theresa'],
            name: 'Honest Abe',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.4906, 36.16314],
      },
      properties: {
        climbs: [
          {
            id: '126436901',
            climber_names: ['theresa'],
            name: 'Fear Is The Mind-Killer',
            grade: 'V4+ 6B+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.40549, 36.16281],
      },
      properties: {
        climbs: [
          {
            id: '107385768',
            climber_names: ['theresa'],
            name: 'The Dead Heart',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '125484963',
            climber_names: ['theresa'],
            name: 'Perky Jugs',
            grade: 'V3-4 6A+',
          },
          {
            id: '106056281',
            climber_names: ['theresa'],
            name: 'The Pearl',
            grade: 'V5 6C',
          },
          {
            id: '106705830',
            climber_names: ['theresa'],
            name: 'The Huck',
            grade: 'V5- 6C',
          },
          {
            id: '106732635',
            climber_names: ['theresa'],
            name: "Jones'n",
            grade: 'V4+ 6B+',
          },
          {
            id: '107429192',
            climber_names: ['theresa'],
            name: 'Ultimate Grandstaff',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-115.4156825, 36.159515],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.6274, 37.06927],
      },
      properties: {
        climbs: [
          {
            id: '112487612',
            climber_names: ['theresa'],
            name: 'Shoetester',
            grade: 'V4 6B',
          },
          {
            id: '108008529',
            climber_names: ['theresa'],
            name: 'Huntsman Graffiti',
            grade: 'V5 6C',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.6307, 37.07794],
      },
      properties: {
        climbs: [
          {
            id: '112517488',
            climber_names: ['theresa'],
            name: 'Toadstool Traverse',
            grade: 'V4-5 6B+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.63276, 37.06753],
      },
      properties: {
        climbs: [
          {
            id: '108139578',
            climber_names: ['theresa'],
            name: 'Underboy',
            grade: 'V4 6B',
          },
          {
            id: '112512668',
            climber_names: ['theresa'],
            name: 'Monkey Boy',
            grade: 'V3 6A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.63155, 37.06494],
      },
      properties: {
        climbs: [
          {
            id: '112482800',
            climber_names: ['theresa'],
            name: 'The Spider',
            grade: 'V3 6A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.73286, 47.54498],
      },
      properties: {
        climbs: [
          {
            id: '106288755',
            climber_names: ['theresa'],
            name: 'The Real Thing',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.16594, 49.66841],
      },
      properties: {
        climbs: [
          {
            id: '106215913',
            climber_names: ['theresa'],
            name: 'Mushroom',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.49906, 45.39152],
      },
      properties: {
        climbs: [
          {
            id: '108400090',
            climber_names: ['theresa'],
            name: 'Flying Squirrel',
            grade: 'V6 7A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '124791042',
            climber_names: ['theresa'],
            name: 'The Witch',
            grade: 'V1 5',
          },
          {
            id: '112157919',
            climber_names: ['theresa'],
            name: 'Heartbreak Hotel',
            grade: 'V2 5+',
          },
          {
            id: '106034519',
            climber_names: ['theresa'],
            name: 'Superfly',
            grade: 'V4 6B',
          },
          {
            id: '111594749',
            climber_names: ['theresa'],
            name: 'Trad Killer',
            grade: 'V4 6B',
          },
          {
            id: '105857248',
            climber_names: ['theresa'],
            name: 'Sloppy Poppy',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-123.15111, 49.68183666666667],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.51998, 47.83166],
      },
      properties: {
        climbs: [
          {
            id: '121228746',
            climber_names: ['theresa'],
            name: 'Seneca',
            grade: 'V4+ 6B+',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.153175, 49.679465],
      },
      properties: {
        climbs: [
          {
            id: '122691676',
            climber_names: ['theresa'],
            name: 'Trap Door',
            grade: 'V4 6B',
          },
          {
            id: '118666381',
            climber_names: ['theresa'],
            name: 'Lowdown',
            grade: 'V1 5',
          },
          {
            id: '110745930',
            climber_names: ['theresa'],
            name: 'Black Dyno',
            grade: 'V3 6A',
          },
          {
            id: '110745902',
            climber_names: ['theresa'],
            name: 'Black Mark',
            grade: 'V4 6B',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.15753, 49.66932],
      },
      properties: {
        climbs: [
          {
            id: '107198282',
            climber_names: ['theresa'],
            name: 'Skywalker',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '105947052',
            climber_names: ['theresa'],
            name: 'Klahanie Crack',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.14261, 49.70407],
      },
      properties: {
        climbs: [
          {
            id: '126418205',
            climber_names: ['theresa'],
            name: 'Elsinore',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '114935623',
            climber_names: ['theresa'],
            name: 'Insta-Graham',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '114935589',
            climber_names: ['theresa'],
            name: 'Dance Eat Sleep Repeat',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '115349910',
            climber_names: ['theresa'],
            name: 'Magical Progression',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '114968506',
            climber_names: ['theresa'],
            name: 'Cragger',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '115349846',
            climber_names: ['theresa'],
            name: 'Trippy Squirrel',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.55947, 47.82262],
      },
      properties: {
        climbs: [
          {
            id: '114417608',
            climber_names: ['theresa'],
            name: 'Zelda Rails',
            grade: 'V4 6B',
          },
          {
            id: '114578065',
            climber_names: ['theresa'],
            name: 'Ocarina of Time',
            grade: 'V3 6A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-109.30434, 38.72161],
      },
      properties: {
        climbs: [
          {
            id: '105717310',
            climber_names: ['theresa'],
            name: 'Stolen Chimney',
            grade: '5.10 6b 20 VII- 19 E2 5b A0',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.74116, 47.54567],
      },
      properties: {
        climbs: [
          {
            id: '119142183',
            climber_names: ['theresa'],
            name: 'Nothing up my Sleeve',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.74356, 47.54482],
      },
      properties: {
        climbs: [
          {
            id: '106228490',
            climber_names: ['theresa'],
            name: 'Hind Quarters',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.71235, 47.59968],
      },
      properties: {
        climbs: [
          {
            id: '105790788',
            climber_names: ['theresa'],
            name: 'Canary',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '105814908',
            climber_names: ['theresa'],
            name: "Stinkin' Slopers",
            grade: 'V5 6C',
          },
          {
            id: '106026630',
            climber_names: ['theresa'],
            name: 'Gates of Fire',
            grade: 'V4+ 6B+',
          },
          {
            id: '109333459',
            climber_names: ['theresa'],
            name: 'Fern Crack',
            grade: 'V3 6A',
          },
          {
            id: '115465610',
            climber_names: ['theresa'],
            name: 'The Hopeful',
            grade: 'V7 7A+',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-121.6075, 47.84756],
            [-121.60878, 47.84797],
            [-121.60596, 47.84753],
            [-121.60562, 47.8471],
            [-121.6075, 47.84756],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.42416, 36.16095],
      },
      properties: {
        climbs: [
          {
            id: '114000113',
            climber_names: ['theresa'],
            name: 'Sorange',
            grade: 'V3 6A',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.55486, 47.82462],
      },
      properties: {
        climbs: [
          {
            id: '122612934',
            climber_names: ['theresa'],
            name: 'Lost in the Mauce',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '122613467',
            climber_names: ['theresa'],
            name: 'Pumpkin Spice',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '122613484',
            climber_names: ['theresa'],
            name: 'Resting Witch Face',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '122613473',
            climber_names: ['theresa'],
            name: 'Tower of Terror',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '122612836',
            climber_names: ['theresa'],
            name: 'Sexy Nurse Log',
            grade: '5.9- 5c 17 VI 16 HVS 4c',
          },
          {
            id: '122613524',
            climber_names: ['theresa'],
            name: 'Hereasy',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '117724916',
            climber_names: ['theresa'],
            name: 'Beauty in the Schmutz',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '105790657',
            climber_names: ['corey', 'theresa'],
            name: 'Great Northern Slab',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '105796710',
            climber_names: ['theresa'],
            name: 'Sagittarius',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '105805741',
            climber_names: ['theresa'],
            name: 'Thin Fingers',
            grade: '5.11a 6c 22 VII+ 22 E3 5c',
          },
          {
            id: '105805984',
            climber_names: ['theresa'],
            name: 'Timberjack',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '108142233',
            climber_names: ['theresa'],
            name: 'Quarry Quack',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '105790674',
            climber_names: ['theresa'],
            name: 'SS Ultrabrutal',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '106621804',
            climber_names: ['theresa'],
            name: 'Taurus',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '106589110',
            climber_names: ['theresa'],
            name: 'Sickle Crack',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '121374177',
            climber_names: ['theresa'],
            name: 'Stolen',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '119257785',
            climber_names: ['theresa'],
            name: 'Flying Salamanders (Full)',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '105790717',
            climber_names: ['theresa'],
            name: 'Godzilla',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '115009105',
            climber_names: ['theresa'],
            name: 'Leaping Lizards (Godzilla P2)',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '105795818',
            climber_names: ['theresa'],
            name: 'Breakfast of Champions',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '124351621',
            climber_names: ['theresa'],
            name: 'Under Moss',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '107690583',
            climber_names: ['theresa'],
            name: 'Mourning Star',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '117285474',
            climber_names: ['theresa'],
            name: 'Leave My Flake Alone',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '120713643',
            climber_names: ['theresa'],
            name: 'Coal Train',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '120714039',
            climber_names: ['theresa'],
            name: '5.10 in B-Major (Top Roping)',
            grade: '5.10 6b 20 VII- 19 E2 5b',
          },
          {
            id: '105790678',
            climber_names: ['theresa'],
            name: 'GM Route',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '121382456',
            climber_names: ['theresa'],
            name: 'Summer Begins',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '120947964',
            climber_names: ['theresa'],
            name: 'Master Wong (Short)',
            grade: '5.10c/d 6b+ 21 VII+ 21 E3 5b',
          },
          {
            id: '119443173',
            climber_names: ['theresa'],
            name: 'Argentinosaurus',
            grade: '5.10c 6b 20 VII 20 E2 5b',
          },
          {
            id: '105805970',
            climber_names: ['theresa'],
            name: 'Racer X',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '117065066',
            climber_names: ['theresa'],
            name: 'Index Archeology',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '121218434',
            climber_names: ['theresa'],
            name: 'Tiny Dancer',
            grade: '5.10b/c 6b 20 VII 20 E2 5b',
          },
          {
            id: '108145655',
            climber_names: ['theresa'],
            name: 'Seamstress (access route)',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '119302571',
            climber_names: ['theresa'],
            name: 'Tommy Dutra Memorial Route (short)',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '105838643',
            climber_names: ['theresa'],
            name: "Roger's Corner",
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '105790710',
            climber_names: ['theresa'],
            name: 'Princely Ambitions',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '106386419',
            climber_names: ['theresa'],
            name: 'Plum Pudding',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '105791086',
            climber_names: ['theresa'],
            name: 'Toxic Shock',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '120714259',
            climber_names: ['theresa'],
            name: 'Four Cords and an Attitude',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '120497083',
            climber_names: ['theresa'],
            name: 'Intro to Index',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '109390095',
            climber_names: ['theresa'],
            name: 'Mean Mug',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '110818298',
            climber_names: ['theresa'],
            name: 'Banana Hammock',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '105800865',
            climber_names: ['theresa'],
            name: 'Cunning Stunt',
            grade: '5.10c/d 6b+ 21 VII+ 21 E3 5b',
          },
          {
            id: '107818883',
            climber_names: ['theresa'],
            name: 'Tunnel Vision',
            grade: '5.10d 6b+ 21 VII+ 21 E3 5b',
          },
          {
            id: '116104034',
            climber_names: ['theresa'],
            name: 'Kaboom aka Jesus take the wheel',
            grade: '5.10+ 6b+ 21 VII+ 20 E3 5b',
          },
          {
            id: '106461837',
            climber_names: ['theresa'],
            name: 'Waiting for the Sun',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '106620653',
            climber_names: ['theresa'],
            name: 'Pisces',
            grade: '5.6 4c 14 V 12 S 4b',
          },
          {
            id: '106171292',
            climber_names: ['theresa'],
            name: 'Tatoosh',
            grade: '5.10b 6a+ 19 VII- 19 E2 5b',
          },
          {
            id: '105805980',
            climber_names: ['theresa'],
            name: 'Gorilla My Dreams',
            grade: '5.10a 6a 18 VI+ 18 E1 5a',
          },
          {
            id: '121374325',
            climber_names: ['theresa'],
            name: 'Big Scary Block',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '119199051',
            climber_names: ['theresa'],
            name: 'Hedge Trimmer',
            grade: '5.6 4c 14 V 12 S 4b',
          },
          {
            id: '114588405',
            climber_names: ['theresa'],
            name: 'A Good First Trad Climb',
            grade: '5.6 4c 14 V 12 S 4b',
          },
          {
            id: '106677557',
            climber_names: ['theresa'],
            name: 'Corner Flash',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-121.5767, 47.81678],
            [-121.57748, 47.81692],
            [-121.57704, 47.81973],
            [-121.56988, 47.82058],
            [-121.56921, 47.81962],
            [-121.57101, 47.81859],
            [-121.57292, 47.81783],
            [-121.5767, 47.81678],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.77103, 47.55538],
      },
      properties: {
        climbs: [
          {
            id: '106590813',
            climber_names: ['theresa'],
            name: 'Twin Cracks',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '105793864',
            climber_names: ['theresa'],
            name: 'Classic Crack',
            grade: '5.8+ 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.1346, 49.7081],
      },
      properties: {
        climbs: [
          {
            id: '106842554',
            climber_names: ['theresa'],
            name: 'Unearthly Delights',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '108637453',
            climber_names: ['theresa'],
            name: 'Root Canal',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '106842559',
            climber_names: ['theresa'],
            name: 'Monkey Coefficient',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
          {
            id: '108177039',
            climber_names: ['theresa'],
            name: 'Call Any Vegetable',
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
          {
            id: '105963378',
            climber_names: ['theresa'],
            name: "Harry's Crack",
            grade: '5.8 5b 16 VI- 15 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-119.1164, 47.9019],
      },
      properties: {
        climbs: [
          {
            id: '107176077',
            climber_names: ['theresa'],
            name: 'Heart of Stone',
            grade: '5.9+ 5c 17 VI 17 E1 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.39599, 44.0135],
      },
      properties: {
        climbs: [
          {
            id: '117302818',
            climber_names: ['theresa'],
            name: 'Corpus Callosum',
            grade: 'V-easy 3',
          },
          {
            id: '113843695',
            climber_names: ['theresa'],
            name: 'The Brain',
            grade: 'V1 5',
          },
          {
            id: '117302789',
            climber_names: ['theresa'],
            name: 'The Brain Escape',
            grade: 'V0 4',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      properties: {
        climbs: [
          {
            id: '121969569',
            climber_names: ['theresa'],
            name: 'The Chip!',
            grade: 'V2+ 5+',
          },
          {
            id: '121969175',
            climber_names: ['theresa'],
            name: 'Lightning strike',
            grade: 'V1+ 5',
          },
          {
            id: '121924023',
            climber_names: ['theresa'],
            name: 'Falcon',
            grade: 'V1+ 5',
          },
          {
            id: '121969463',
            climber_names: ['theresa'],
            name: 'Small traverse',
            grade: 'V0 4',
          },
          {
            id: '121980685',
            climber_names: ['theresa'],
            name: 'Pillow Talk',
            grade: 'V0 4',
          },
          {
            id: '121924199',
            climber_names: ['theresa'],
            name: "Freddy's Direct",
            grade: 'V2 5+',
          },
          {
            id: '121980576',
            climber_names: ['theresa'],
            name: 'knife blade arête',
            grade: 'V1+ 5',
          },
        ],
        total_climbers: 2,
      },
      geometry: {
        type: 'Point',
        coordinates: [-121.3421, 44.041999999999994],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.76998, 46.21201],
      },
      properties: {
        climbs: [
          {
            id: '114414890',
            climber_names: ['theresa'],
            name: 'Lady Slipper',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.44865, 48.62285],
      },
      properties: {
        climbs: [
          {
            id: '113665378',
            climber_names: ['theresa'],
            name: 'Flyboys',
            grade: '5.9 5c 17 VI 17 HVS 5a',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.62058, 47.42952],
      },
      properties: {
        climbs: [
          {
            id: '114955236',
            climber_names: ['theresa'],
            name: 'Like Flowers Come Spring',
            grade: '5.9- 5c 17 VI 16 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.75198, 34.88907],
      },
      properties: {
        climbs: [
          {
            id: '116500446',
            climber_names: ['theresa'],
            name: 'Motorboating',
            grade: '5.9- 5c 17 VI 16 HVS 4c',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.78373, 47.48786],
      },
      properties: {
        climbs: [
          {
            id: '105808527',
            climber_names: ['theresa'],
            name: 'West Ridge',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.11147, 47.664294999999996],
      },
      properties: {
        climbs: [
          {
            id: '109355419',
            climber_names: ['theresa'],
            name: 'Corner',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
          {
            id: '114268597',
            climber_names: ['theresa'],
            name: 'West Rib',
            grade: '5.5 4b 13 IV+ 11 MS 4a',
          },
          {
            id: '109355407',
            climber_names: ['theresa'],
            name: 'Left Ramp',
            grade: '5.7 5a 15 V+ 13 MVS 4b',
          },
        ],
        total_climbers: 2,
      },
    },
  ],
};
