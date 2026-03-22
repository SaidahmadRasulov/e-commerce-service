import User from "./user.model.js";
import Product from "./product.model.js";
import Group from "./group.model.js";
import Permission from "./permission.model.js";
import GroupPermission from "./group_permission.model.js";

// User → Group
User.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(User, { foreignKey: "groupId" });

// Group ↔ Permission (many-to-many, junction: group_permissions)
Group.belongsToMany(Permission, {
  through: GroupPermission,
  foreignKey: "groupId",
  otherKey: "permissionId",
});
Permission.belongsToMany(Group, {
  through: GroupPermission,
  foreignKey: "permissionId",
  otherKey: "groupId",
});

User.hasMany(Product, { foreignKey: "userId", as: "products" });
Product.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Product, Group, Permission, GroupPermission };