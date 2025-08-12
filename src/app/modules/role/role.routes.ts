import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/seedRoleData';
import validation from '../../middlewares/validation';
import { RoleValidation } from './role.validation';
import { RoleController } from './role.controller';

const router = Router();

router.post(
  '/',
  auth([featureNames.profile]),
  validation(RoleValidation.createRoleValidation),
  RoleController.createRole,
);

router.get('/', RoleController.getRoles);

router.get('/:id', auth([featureNames.profile]), RoleController.getRoleById);

router.put(
  '/:id',
  auth([featureNames.profile]),
  validation(RoleValidation.updateRoleValidation),
  RoleController.updateRole,
);

router.delete('/:id', auth([featureNames.profile]), RoleController.deleteRole);

export const RoleRoutes = router;
