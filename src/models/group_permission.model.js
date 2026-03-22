import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const GroupPermission = sequelize.define(
  "GroupPermission",
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "groups", key: "id" },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "permissions", key: "id" },
    },
  },
  {
    tableName: "group_permissions",
    timestamps: true,
  },
);

export default GroupPermission;
