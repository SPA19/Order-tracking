import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Products_tracker = sequelize.define("products_tracker", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});
