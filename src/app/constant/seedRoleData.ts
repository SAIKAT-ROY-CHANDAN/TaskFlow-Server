import { TAdminRole } from '../types/departmentHeadRole.type';

export const seedRoleAdminData: TAdminRole = {
  name: 'Super Admin',
  roleFeature: [
    {
      name: 'Dashboard',
      path: 'dashboard',
      index: 1,
    },
    {
      name: 'Blog Post',
      path: 'blogs',
      index: 2,
    },
    {
      name: "Categories",
      path: "categories",
      index: 3,
    },
    {
      name: 'Subscribers',
      path: 'subscribers',
      index: 4,
    },
    {
      name: 'Contacts',
      path: 'contacts',
      index: 5,
    },
    {
      name: 'Projects',
      path: 'projects',
      index: 6,
    },
    {
      name: 'Services',
      path: 'services',
      index: 7,
    },
    {
      name: 'Managements',
      path: 'managements',
      index: 8,
    },
    {
      name: 'Testimonials',
      path: 'testimonials',
      index: 9,
    },
    {
      name: 'Clients',
      path: 'clients',
      index: 10,
    },
    {
      name: 'FAQ`s',
      path: 'faqs',
      index: 11,
    },
    {
      name: 'Other Page Setup',
      path: 'other-page-setup',
      index: 12,
    },
    {
      name: 'Job Management',
      path: 'job-management',
      index: 13,
    },
    {
      name: 'specialized industry',
      path: 'specialized-industry',
      index: 14,
    },
    {
      name: 'Invoice',
      path: 'invoice',
      index: 15,
    },
    {
      name: 'Role Management',
      path: 'role-management',
      index: 16,
    },
    {
      name: 'Profile Details',
      path: 'profile-details',
      index: 17,
    },
  ],
};

export const featureNames = {
  dashboard: 'Dashboard',
  blogs: 'Blog Post',
  categories: 'Categories',
  subscribers: 'Subscribers',
  contacts: 'Contacts',
  projects: 'Projects',
  services: 'Services',
  managements: 'Managements',
  testimonials: 'Testimonials',
  clients: 'Clients',
  faqs: 'FAQ`s',
  otherPageSetup: 'Other Page Setup',
  jobManagement: 'Job Management',
  specializedIndustry: 'Specialized Industry',
  invoice: 'Invoice',
  roleManagement: 'Role Management',
  profileDetails: 'Profile Details',
};
