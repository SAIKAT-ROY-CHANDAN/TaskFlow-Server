import { Router } from "express";
import { RoleController } from "./role.controller";

const router = Router();

router.get(
    '/get-users',
    RoleController.getUsers,
);


export const RoleRoutes = router;