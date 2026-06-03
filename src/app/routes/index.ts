import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { authRoutes } from '../modules/auth/auth.routes';
import { RoleRoutes } from '../modules/role/role.routes';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/role',
    route: RoleRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
