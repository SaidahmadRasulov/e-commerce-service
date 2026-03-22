import { Group, Permission } from "../models/index.js";

export const getGroupPermissions = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
      include: [{ model: Permission, through: { attributes: [] } }],
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    res.status(200).json({ group, permissions: group.Permissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPermissionsToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { permissionIds } = req.body;

    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
      return res
        .status(400)
        .json({ message: "permissionIds must be a non-empty array" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });

    if (permissions.length !== permissionIds.length) {
      return res.status(400).json({ message: "One or more permission ids are invalid" });
    }

    await group.addPermissions(permissions);

    const updated = await Group.findByPk(groupId, {
      include: [{ model: Permission, through: { attributes: [] } }],
    });

    res.status(200).json({
      message: "Permissions added to group",
      group: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setGroupPermissions = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { permissionIds } = req.body;

    if (!Array.isArray(permissionIds)) {
      return res.status(400).json({ message: "permissionIds must be an array" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    if (permissionIds.length > 0) {
      const permissions = await Permission.findAll({
        where: { id: permissionIds },
      });
      if (permissions.length !== permissionIds.length) {
        return res.status(400).json({ message: "One or more permission ids are invalid" });
      }
    }

    await group.setPermissions(permissionIds);

    const updated = await Group.findByPk(groupId, {
      include: [{ model: Permission, through: { attributes: [] } }],
    });

    res.status(200).json({
      message: "Group permissions updated",
      group: updated,
      permissions: updated.Permissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removePermissionFromGroup = async (req, res) => {
  try {
    const { groupId, permissionId } = req.params;
    const pid = Number(permissionId);

    if (Number.isNaN(pid)) {
      return res.status(400).json({ message: "Invalid permission id" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    const permission = await Permission.findByPk(pid);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found!" });
    }

    await group.removePermission(permission);

    const updated = await Group.findByPk(groupId, {
      include: [{ model: Permission, through: { attributes: [] } }],
    });

    res.status(200).json({
      message: "Permission removed from group",
      group: updated,
      permissions: updated.Permissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
