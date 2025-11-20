import { Sequelize } from "sequelize";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "cache.db");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false,
});

export default sequelize;
