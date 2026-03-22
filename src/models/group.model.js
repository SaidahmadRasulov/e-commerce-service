import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Group = sequelize.define(
  "Group",
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
    tableName: "groups",
    timestamps: true,
  },
);

export default Group;
