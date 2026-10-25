import { NavLink } from './company';
import { Residence, Stat } from './amaris.data';

export const KAIROS_NAV_LINKS: NavLink[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'residences', label: 'Residences' },
  { id: 'location', label: 'Location' },
];

export const KAIROS_UNIT_SIZES = ['4,797 sq ft', '5,373 sq ft', '5,573 sq ft', '5,616 sq ft'];

export const KAIROS_STATS: Stat[] = [
  { value: 3.25, decimals: 2, label: 'Acres of land' },
  { value: 2, label: 'High-rise towers' },
  { value: 48, prefix: 'G+', label: 'Floors' },
  { value: 4, label: 'Basement levels' },
  { value: 238, label: 'Residences' },
];

export const KAIROS_RESIDENCES: Residence[] = [
  { tower: 'Tower A', size: '4,797', note: '4 BHK, three residences per floor' },
  { tower: 'Tower A', size: '5,373', note: '4 BHK, three residences per floor' },
  { tower: 'Tower B', size: '5,573', note: '4 BHK, two exclusive residences per floor' },
  { tower: 'Tower B', size: '5,616', note: '4 BHK, two exclusive residences per floor' },
];
