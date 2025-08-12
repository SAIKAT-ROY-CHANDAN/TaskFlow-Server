import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RoleRoutes } from '../modules/role/role.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { SubscriberRoutes } from '../modules/subscriber/subscriber.routes';

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
