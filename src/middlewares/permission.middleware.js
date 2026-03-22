import { Permission, Group } from "../models/index.js";

export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      const group = await Group.findByPk(user.groupId, {
        include: Permission,
      });

      const permissions = group.Permissions.map((p) => p.name);

      if (!permissions.includes(permissionName)) {
        return res.status(403).json({
          message: "Forbidden: no permission",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};