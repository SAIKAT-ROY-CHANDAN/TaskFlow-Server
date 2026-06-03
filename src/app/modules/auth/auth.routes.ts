import { Router } from 'express';
import { AuthController } from './auth.controller';
import {
  registerValidationSchema,
  loginValidationSchema,
} from './auth.validation';
import validation from '../../middlewares/validation';

const router = Router();

router.post(
  '/register',
  validation(registerValidationSchema),
  AuthController.register,
);

router.post('/login', validation(loginValidationSchema), AuthController.login);

export const authRoutes = router;
