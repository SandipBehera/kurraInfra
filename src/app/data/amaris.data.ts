export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

export interface Feature {
  title: string;
  text: string;
  image: string;
}

export interface Residence {
  tower: string;
  size: string;
  note: string;
}

export interface Landmark {
  name: string;
  distance: string;
}

export interface LocationGroup {
  key: string;
  label: string;
  items: Landmark[];
}

export const AMARIS_RERA = 'P02400009940';

export const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'clubhouse', label: 'Clubhouse' },
  { id: 'master-plan', label: 'Master Plan' },
  { id: 'residences', label: 'Residences' },
  { id: 'location', label: 'Location' },
];

export const UNIT_SIZES = ['6,228 sq ft', '6,996 sq ft', '7,731 sq ft', '9,495 sq ft'];

export const STATS: Stat[] = [
  { value: 3.65, decimals: 2, label: 'Acres of land' },
  { value: 2, label: 'Towers' },
  { value: 50, prefix: 'G+', label: 'Floors' },
  { value: 194, label: 'Residences' },
  { value: 4, label: 'Basement levels' },
  { value: 840, label: 'Car parking bays' },
  { value: 81840, suffix: ' sq ft', label: 'Amenity area' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Grand Entry Plaza',
    text: 'A sculpted arrival court that links both towers and sets the tone the moment you drive in.',
    image: 'images/amaris_first_impression_1.webp',
  },
  {
    title: 'Private Plunge Pools',
    text: 'Select Tower A residences open onto their own plunge pool, suspended above the city.',
    image: 'images/plunge_pool.webp',
  },
  {
    title: 'Walk-in Wardrobes',
    text: 'Every bedroom comes with a dedicated walk-in wardrobe, finished like a private boutique.',
    image: 'images/walkin_wardrobe.webp',
  },
  {
    title: 'Poolside Living',
    text: 'Panoramic views, sun decks, a kids’ pool and a lounge, all within a few steps of home.',
    image: 'images/amaris_pool.webp',
  },
  {
    title: 'Traffic-free Podium',
    text: 'Multi-level parking keeps cars below ground, leaving the podium to gardens and people.',
    image: 'images/amaris_project1.webp',
  },
  {
    title: 'Triple-height Lobbies',
    text: 'Light-filled lobbies with a reception lounge, party hall and business centre.',
    image: 'images/amaris_tower_mb.webp',
  },
];

export const CLUB_SPACES: Feature[] = [
  {
    title: 'Barbeque Lounge',
    text: 'An open-air pergola bar set in landscaped greens.',
    image: 'images/amaris_club1.webp',
  },
  {
    title: 'Mini Theatre',
    text: 'Private screenings in a plush, acoustically tuned room.',
    image: 'images/amaris_club2.webp',
  },
  {
    title: 'Business Room',
    text: 'A quiet boardroom for meetings without the commute.',
    image: 'images/amaris_club3.webp',
  },
];

export const CLUB_AMENITIES = [
  'Swimming pool',
  'Fitness centre',
  'Wellness centre',
  'Café',
  'Business lounge',
  'Bar',
  'Guest lounges',
  'Badminton court',
  'Indoor sports',
  'Party hall',
  'Landscaped gardens',
  'Kids’ pool',
];

export const RESIDENCES: Residence[] = [
  { tower: 'Tower B', size: '6,228', note: '4 BHK residence' },
  { tower: 'Tower B', size: '6,996', note: '4 BHK residence' },
  { tower: 'Tower A', size: '7,731', note: '4 BHK with private plunge pool' },
  { tower: 'Tower A', size: '9,495', note: '4 BHK with private plunge pool' },
];

export const LOCATION_GROUPS: LocationGroup[] = [
  {
    key: 'offices',
    label: 'Offices',
    items: [
      { name: 'Nvidia', distance: '0.1 km' },
      { name: 'Google', distance: '0.2 km' },
      { name: 'Capgemini', distance: '0.6 km' },
      { name: 'Amazon', distance: '0.8 km' },
      { name: 'Cognizant', distance: '1.1 km' },
      { name: 'US Consulate', distance: '1.7 km' },
      { name: 'Wipro', distance: '1.8 km' },
      { name: 'Infosys', distance: '3.3 km' },
    ],
  },
  {
    key: 'schools',
    label: 'Schools',
    items: [
      { name: 'The Shri Ram Universal School', distance: '1.5 km' },
      { name: 'Key Stone International', distance: '1.6 km' },
      { name: 'Gaudium', distance: '2.2 km' },
      { name: 'Shri Ram Academy', distance: '3.3 km' },
      { name: 'Delhi Public School', distance: '4.3 km' },
      { name: 'Oakridge International', distance: '4.5 km' },
    ],
  },
  {
    key: 'hospitals',
    label: 'Hospitals',
    items: [
      { name: 'Continental Hospitals', distance: '0.65 km' },
      { name: 'Apollo Hospitals', distance: '2.3 km' },
      { name: 'Star Hospitals', distance: '2.8 km' },
      { name: 'Rainbow Hospitals', distance: '2.8 km' },
    ],
  },
  {
    key: 'connectivity',
    label: 'Connectivity',
    items: [
      { name: 'Outer Ring Road', distance: '0.8 km' },
      { name: 'ISB Road', distance: '1.0 km' },
      { name: 'Financial District Circle', distance: '1.8 km' },
    ],
  },
  {
    key: 'hotels',
    label: 'Hotels',
    items: [
      { name: 'Hyatt', distance: '0.6 km' },
      { name: 'Sheraton', distance: '1.3 km' },
    ],
  },
];
