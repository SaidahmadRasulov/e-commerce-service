import { sequelize } from "../config/db.js";
import "../models/index.js";
import { seedDatabase } from "./seed.js";

async function main() {
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
  await seedDatabase();
  await sequelize.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
