import User from "./user.model.js";
import Product from "./product.model.js";
import Group from "./group.model.js";
import Permission from "./permission.model.js";

// User → Group
User.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(User, { foreignKey: "groupId" });

// Group → Permission (MANY TO MANY)
Group.belongsToMany(Permission, {
  through: "group_permissions",
});
Permission.belongsToMany(Group, {
  through: "group_permissions",
});

export { User, Product, Group, Permission };