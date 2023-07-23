import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  storage: "./dev.sqlite", 
  logging: true,
});

export default sequelize;
