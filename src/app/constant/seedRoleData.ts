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
      name: 'Categories',
      path: 'categories',
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
      name: 'Admin Contact',
      path: 'admin-contact',
      index: 6,
    },
    {
      name: 'Projects',
      path: 'projects',
      index: 7,
    },
    {
      name: 'Services',
      path: 'services',
      index: 8,
    },
    {
      name: 'Managements',
      path: 'managements',
      index: 9,
    },
    {
      name: 'Testimonials',
      path: 'testimonials',
      index: 10,
    },
    {
      name: 'Partners',
      path: 'clients',
      index: 11,
    },
    {
      name: 'FAQ`s',
      path: 'faqs',
      index: 12,
    },
    {
      name: 'Other Page Setup',
      path: 'other-page-setup',
      index: 13,
    },
    {
      name: 'Job Management',
      path: 'job-management',
      index: 14,
    },
    {
      name: 'Industries',
      path: 'industries',
      index: 15,
    },
    {
      name: 'Specialized Industry',
      path: 'specialized-industry',
      index: 16,
    },
    {
      name: 'Invoice',
      path: 'invoice',
      index: 17,
    },
    {
      name: 'Role Management',
      path: 'role-management',
      index: 18,
    },
    {
      name: 'Profile Details',
      path: 'profile-details',
      index: 19,
    },
  ],
};

export const featureNames = {
  dashboard: 'Dashboard',
  blogs: 'Blog Post',
  categories: 'Categories',
  subscribers: 'Subscribers',
  contacts: 'Contacts',
  adminContact: 'Admin Contact',
  projects: 'Projects',
  services: 'Services',
  managements: 'Managements',
  testimonials: 'Testimonials',
  partners: 'Partners',
  faqs: 'FAQ`s',
  otherPageSetup: 'Other Page Setup',
  jobManagement: 'Job Management',
  specializedIndustry: 'Specialized Industry',
  invoice: 'Invoice',
  roleManagement: 'Role Management',
  profileDetails: 'Profile Details',
};
