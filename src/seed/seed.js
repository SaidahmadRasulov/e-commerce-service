import bcrypt from "bcrypt";
import { User, Group, Permission } from "../models/index.js";

const PERMISSION_DEFS = [
  { name: "create_product", code_name: "create" },
  { name: "update_product", code_name: "update" },
  { name: "delete_product", code_name: "delete" },
  { name: "view_product", code_name: "view" },
  { name: "manage_groups", code_name: "mng" },
];

export const seedDatabase = async () => {
  for (const def of PERMISSION_DEFS) {
    await Permission.findOrCreate({
      where: { name: def.name },
      defaults: def,
    });
  }

  const permissions = await Permission.findAll();

  // 2. GROUPS
  const [adminGroup] = await Group.findOrCreate({
    where: { name: "admin" },
    defaults: {
      name: "admin",
      code_name: "adm",
    },
  });
  const [workerGroup] = await Group.findOrCreate({
    where: { name: "worker" },
    defaults: {
      name: "worker",
      code_name: "wrk",
    },
  });
  const [userGroup] = await Group.findOrCreate({
    where: { name: "user" },
    defaults: {
      name: "user",
      code_name: "usr",
    },
  });

  // 3. ADMINGA HAMMA PERMISSION BERAMIZ
  await adminGroup.setPermissions(permissions);

  // 4. WORKER PERMISSIONS
  const workerPermissions = permissions.filter((p) =>
    ["create_product", "update_product"].includes(p.name),
  );
  await workerGroup.setPermissions(workerPermissions);

  // 5. USER PERMISSIONS
  const userPermissions = permissions.filter((p) => p.name === "view_product");
  await userGroup.setPermissions(userPermissions);

  // 6. ADMIN USER
  const hashedPassword = await bcrypt.hash("123456", 10);

  const [adminUser] = await User.findOrCreate({
    where: { email: "admin@gmail.com" },
    defaults: {
      password: hashedPassword,
      groupId: adminGroup.id,
    },
  });

  // ensure group is correct
  if (adminUser.groupId !== adminGroup.id) {
    adminUser.groupId = adminGroup.id;
    await adminUser.save();
  }

  console.log("✅ Seed completed");
};
