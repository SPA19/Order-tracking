import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./Order.js";

export const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

Customer.hasMany(Order);
Order.belongsTo(Customer);
