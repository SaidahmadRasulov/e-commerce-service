import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from "../controllers/group.controller.js";
import {
  addPermissionsToGroup,
  getGroupPermissions,
  removePermissionFromGroup,
  setGroupPermissions,
} from "../controllers/group_permission.controller.js";

import { validate_form } from "../middlewares/validate_form.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const group_router = Router();

group_router.get("/", getGroups);

group_router.get("/:groupId/permissions", authCheck, checkPermission("manage_groups"), getGroupPermissions);
group_router.put(
  "/:groupId/permissions",
  authCheck,
  checkPermission("manage_groups"),
  setGroupPermissions,
);
group_router.post(
  "/:groupId/permissions",
  authCheck,
  checkPermission("manage_groups"),
  addPermissionsToGroup,
);
group_router.delete(
  "/:groupId/permissions/:permissionId",
  authCheck,
  checkPermission("manage_groups"),
  removePermissionFromGroup,
);

group_router.get("/:id", getGroupById);
group_router.post("/", authCheck, checkPermission("create_group"), validate_form, createGroup);
group_router.put(
  "/:id",
  authCheck,
  checkPermission("update_group"),
  validate_form,
  updateGroup,
);
group_router.delete(
  "/:id",
  authCheck,
  checkPermission("delete_group"),
  deleteGroup,
);

export default group_router;
