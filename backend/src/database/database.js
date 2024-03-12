import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db_prueba_tecnica", "root", "santi1234", {
  host: "localhost",
  port: 3306,
  dialect: "mariadb",
  define: {
    timestamps: true,
  },
  logging:false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
