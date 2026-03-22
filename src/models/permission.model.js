import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    code_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  },
);

export default Permission;
