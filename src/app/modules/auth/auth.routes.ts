import { Router } from 'express';
import validation from '../../middlewares/validation';
import { authValidations } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import { imageUpload, uploadImages } from '../../middlewares/multer';

const router = Router();

router.post(
  '/login',
  validation(authValidations.loginValidation),
  AuthController.login,
);

router.post(
  '/register',
  auth([featureNames.profile]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  validation(authValidations.registerValidation),
  AuthController.createDepartmentHead,
);

router.post('/forget-password', AuthController.forgetPassword);

router.post('/reset-password', AuthController.resetPassword);

router.post(
  '/change-password',
  auth([featureNames.settings]),
  validation(authValidations.changePasswordValidation),
  AuthController.changePassword,
);

router.post('/refresh-token', AuthController.refreshAccessToken);

router.get(
  '/department-heads',
  // auth([featureNames.profile]),
  AuthController.getDepartmentHeads,
);

router.get('/me', auth([]), AuthController.getLoggedDepartmentHeadDetails);

router.put(
  '/update-profile',
  auth([featureNames.profile]),
  imageUpload.single('profilePhoto'),
  uploadImages,
  AuthController.updateDepartmentHeadProfile,
);

router.delete(
  '/department-heads/:id',
  auth([featureNames.profile]),
  AuthController.deleteDepartmentHead,
);

export const AuthRoutes = router;
