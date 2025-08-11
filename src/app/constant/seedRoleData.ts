import { TAdminRole } from "../types/departmentHeadRole.type";

export const seedRoleAdminData: TAdminRole = {
  name: 'Super Admin',
  roleFeature: [
    {
      name: 'Overview',
      path: 'dashboard',
      index: 1,
    },
    {
      name: 'Donations',
      path: 'donations',
      index: 2,
    },
    {
      name: 'Donors',
      path: 'donors',
      index: 3,
    },
    {
      name: 'Events',
      path: 'events',
      index: 4,
    },
    {
      name: 'Campaigns',
      path: 'campaigns',
      index: 5,
    },
    {
      name: 'Volunteer',
      path: 'volunteer',
      index: 6,
    },
    {
      name: 'Partnership',
      path: 'partnership',
      index: 7,
    },
    {
      name: 'Management',
      path: 'management',
      index: 8,
    },
    {
      name: 'Blogs',
      path: 'blogs',
      index: 9,
    },
    {
      name: 'Contacts',
      path: 'contacts',
      index: 10,
    },
    {
      name: 'Profile',
      path: 'profile',
      index: 11,
    },
    {
      name: 'Settings',
      path: 'settings',
      index: 12,
    },
  ],
};

export const featureNames = {
  dashboard: 'Overview',
  donations: 'Donations',
  donors: 'Donors',
  events: 'Events',
  campaigns: 'Campaigns',
  volunteer: 'Volunteer',
  partnership: 'Partnership',
  management: 'Management',
  blogs: 'Blogs',
  contacts: 'Contacts',
  profile: 'Profile',
  settings: 'Settings',
};
