export interface ProjectSummary {
  slug: string;
  name: string;
  status: string;
  tagline: string;
  sizes: string;
  image: string;
  facts: { value: string; label: string }[];
}

export const PROJECTS: ProjectSummary[] = [
  {
    slug: 'amaris',
    name: 'Amaris',
    status: 'Ultra-luxury 4 BHK',
    tagline: 'Two G+50 towers with private plunge pool residences and an exclusive clubhouse.',
    sizes: '6,228 – 9,495 sq ft',
    image: 'images/amaris_home_card.webp',
    facts: [
      { value: '3.65', label: 'Acres' },
      { value: 'G+50', label: 'Floors' },
      { value: '194', label: 'Residences' },
    ],
  },
  {
    slug: 'kairos',
    name: 'Kairos',
    status: 'Coming soon',
    tagline: 'A landmark pair of towers built around privacy, space and refined living.',
    sizes: '4,797 – 5,616 sq ft',
    image: 'images/K-Mobile-2560x1227.jpg',
    facts: [
      { value: '3.25', label: 'Acres' },
      { value: 'G+48', label: 'Floors' },
      { value: '238', label: 'Residences' },
    ],
  },
];
