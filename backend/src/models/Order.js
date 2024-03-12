import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderDate: {
    type: DataTypes.DATE,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
  },
});

