import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';

import { AboutFounderRoutes } from '../modules/about-founder/about-founder.routes';
import { AboutUsRoutes } from '../modules/about-us/about-us.routes';
import { AnnualReportRoutes } from '../modules/annual-report/annual-report.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { CampaignRoutes } from '../modules/campaign/campaign.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { DonationRoutes } from '../modules/donation/donation.routes';
import { EventRoutes } from '../modules/event/event.routes';
import { FactsRoutes } from '../modules/facts/facts.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeatureSuccessRoutes } from '../modules/feature-success-rate/feature-success-rate.routes';
import { FeatureVideoRoutes } from '../modules/feature-video/feature-video.routes';
import { GalleryPhotoRoutes } from '../modules/gallery-photo/gallery-photo.routes';
import { GalleryVideoRoutes } from '../modules/gallery-video/gallery-video.routes';
import { GeneralTestimonialsRoutes } from '../modules/general-testimonial/general-testimonial.routes';
import { HeroSectionRoutes } from '../modules/heroSection/heroSection.routes';
import { ManagementRoutes } from '../modules/management/management.routes';
import { OurCausesRoutes } from '../modules/our-causes/our-causes.routes';
import { PartnerShipRoutes } from '../modules/partnership/partnership.routes';
import { RoleRoutes } from '../modules/role/role.routes';
import { VideoTestimonialsRoutes } from '../modules/video-testimonials/video-testimonials.routes';
import { VolunteerRoutes } from '../modules/volunteer/volunteer.routes';
import { WhatWeDoRoutes } from '../modules/what-we-do/what-we-do.routes';
import { WhyChoseUsRoutes } from '../modules/why-chose-us/why-chose-us.routes';
import { SuccessStoryRoutes } from '../modules/success-story/successStory.routes';
import { OverviewRoutes } from '../modules/overview/overview.routes';
import { OurApproachRoutes } from '../modules/our-approach/our-approach.routes';
import { FounderQuoteRoutes } from '../modules/founder-quote/founder-quote.routes';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/roles',
    route: RoleRoutes,
  },
  {
    path: '/campaigns',
    route: CampaignRoutes,
  },
  {
    path: '/donations',
    route: DonationRoutes,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/hero-section',
    route: HeroSectionRoutes,
  },
  {
    path: '/general-testimonials',
    route: GeneralTestimonialsRoutes,
  },
  {
    path: '/video-testimonials',
    route: VideoTestimonialsRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
  {
    path: '/volunteers',
    route: VolunteerRoutes,
  },
  {
    path: '/gallery-photos',
    route: GalleryPhotoRoutes,
  },
  {
    path: '/gallery-videos',
    route: GalleryVideoRoutes,
  },
  {
    path: '/partnerships',
    route: PartnerShipRoutes,
  },
  {
    path: '/managements',
    route: ManagementRoutes,
  },
  {
    path: '/about-us',
    route: AboutUsRoutes,
  },
  {
    path: '/what-we-do',
    route: WhatWeDoRoutes,
  },
  {
    path: '/our-causes',
    route: OurCausesRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/about-founders',
    route: AboutFounderRoutes,
  },
  {
    path: '/why-chose-us',
    route: WhyChoseUsRoutes,
  },
  {
    path: '/feature-success-rate',
    route: FeatureSuccessRoutes,
  },
  {
    path: '/feature-video',
    route: FeatureVideoRoutes,
  },
  {
    path: '/annual-reports',
    route: AnnualReportRoutes,
  },
  {
    path: '/overviews',
    route: OverviewRoutes,
  },
  {
    path: '/facts',
    route: FactsRoutes,
  },
  {
    path: '/success-story',
    route: SuccessStoryRoutes,
  },
  {
    path: '/our-approach',
    route: OurApproachRoutes,
  },
  {
    path: '/about-founder-quotes',
    route: FounderQuoteRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
