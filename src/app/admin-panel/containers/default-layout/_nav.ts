import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: './dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'About Us',
    iconComponent: { name: 'cil-star' },
    url: './about-us'
  },
  {
    name: 'Client Reviews',
    iconComponent: { name: 'cil-cursor' },
    url: './client-reviews'
  },
  {
    name: 'Services',
    iconComponent: { name: 'cil-notes' },
    url: './services'
  },

  {
    name: 'Pricing Plan',
    iconComponent: { name: 'cil-bell' },
    url: './prices',
  },
  {
    name: 'User',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Find All',
        url: './user'
      },
      {
        name: 'General User',
        url: './general-user'
      },
      {
        name: 'Beautician User',
        url: './beautician-user'
      },
    ]
  },
];
