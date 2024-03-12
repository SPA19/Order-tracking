import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./Order.js";
import { Customer } from "./Customer.js";
import { Products_tracker } from "./Products_tracker.js";
import { Transport } from "./Transport.js";


export const Delivery_trace = sequelize.define("delivery_trace", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  productSku: {
    type: DataTypes.STRING,
  },
  deliveryDate: {
    type: DataTypes.DATE,
  },
  dispatchDate: {
    type: DataTypes.DATE,
  },
  podReceived: {
    type: DataTypes.STRING,
  },
  podStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  orderNote: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

Delivery_trace.hasOne(Order)

Delivery_trace.belongsToMany(Customer,{
  through: "delivery_costumer"
})

Delivery_trace.hasMany(Products_tracker)

Transport.hasMany(Delivery_trace);