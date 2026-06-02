import { Router } from 'express';
import { authController } from './auth.controller';
import { registerValidationSchema, loginValidationSchema } from './auth.validation';
import validation from '../../middlewares/validation';

const router = Router();

router.post(
  '/register',
  validation(registerValidationSchema),
  authController.register
);

router.post(
  '/login',
  validation(loginValidationSchema),
  authController.login
);

export const authRoutes = router;
