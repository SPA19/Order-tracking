import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./Order.js";

export const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  productSKU: {
    type: DataTypes.STRING,
  },
  unitPrice: {
    type: DataTypes.INTEGER,
  },
});

Product.belongsToMany(Order, { through: "product_order" });
