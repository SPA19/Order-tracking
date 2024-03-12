import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Delivery_trace } from "./Delivery_trace.js";

export const Transport = sequelize.define("transport", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  contactInfo: {
    type: DataTypes.STRING,
  },
});
