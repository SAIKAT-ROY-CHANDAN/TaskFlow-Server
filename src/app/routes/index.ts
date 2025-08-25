import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RoleRoutes } from '../modules/role/role.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { SubscriberRoutes } from '../modules/subscriber/subscriber.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { AdminContactRoutes } from '../modules/admin-contact/admin-contact.routes';
import { ProjectRoutes } from '../modules/project/project.routes';
import { FaqsRoutes } from '../modules/faqs/faq.routes';
import BannerRoutes from '../modules/banner/banner.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { FooterRoutes } from '../modules/footer/footer.routes';

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
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/subscribers',
    route: SubscriberRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/admin-contacts',
    route: AdminContactRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/banners',
    route: BannerRoutes,
  },
  {
    path: '/faqs',
    route: FaqsRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/footer",
    route: FooterRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
