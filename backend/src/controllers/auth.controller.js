import { Customer } from "../models/Customer.js";

import bcryp from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userName = await Customer.findOne({
      where: { username },
    });

    if (userName)
      return res.status(400).json({ message: "Nombre de usuario existente" });

    const userEmail = await Customer.findOne({
      where: { email },
    });

    if (userEmail)
      return res.status(400).json({ message: "Este correo ya existe" });

    const passwordHash = await bcryp.hash(password, 10);

    const userSaved = await Customer.create({
      username,
      email,
      password: passwordHash,
    });

    const token = await createAccessToken({ id: userSaved.id });

    res.cookie("token", token);
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await Customer.findOne({
      where: { email },
    });

    if (!userFound)
      return res.status(400).json({ message: "Email no encontrado" });

    const isMatch = await bcryp.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound.id });
    res.cookie("token", token);
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await Customer.findByPk(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// todo lo relacionado con los productos

export const create_product = async (req, res) => {
  const { name, category, productSKU, unitPrice } = req.body;

  try {
    const productExist = await Product.findOne({
      where: { name },
    });

    if (productExist)
      return res.status(400).json({ message: "Este producto ya existe" });

    const newProduct = await Product.create({
      name,
      category,
      productSKU,
      unitPrice,
    });

    res.json({
      id: newProduct.id,
      name_product: newProduct.name,
      stock: newProduct.productSKU,
      precio: newProduct.unitPrice,
      message: `Se ha creado el producto correctamente ${newProduct.name}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const products = async (req, res) => {
  try {
    const findAllProducts = await Product.findAll();
    return res.status(200).send({ findAllProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create_order = async (req, res) => {
  const { username, email, products, quantities } = req.body;
  const Datenow = new Date();
  try {
    const findCustomer = await Customer.findOne({
      where: { username, email },
    });

    if (!findCustomer) {
      return res.status(404).json({
        message: "Debes registrarte para poder crear un pedido.",
      });
    }

    const idCustomer = findCustomer.id;

    const elements = await Promise.all(
      products.map(async (element) => {
        const findProductOrder = await Product.findOne({
          where: { name: element },
        });
        if (!findProductOrder)
          throw new Error(`Hay un producto que no existe ${element}`);

        return findProductOrder.unitPrice;
      })
    );

    let total = 0;
    const totalAmount = elements.map((elements, index) => {
      const multiplication = elements * quantities[index];
      total = total + multiplication;
      return total;
    });

    const orderSaved = await Order.create({
      orderDate: Datenow,
      totalAmount: totalAmount[totalAmount.length - 1],
      customerId: idCustomer,
    });

    return res.status(200).send({orderSaved});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const findAllOrders = await Order.findAll({
      include: Customer,
    });
    return res.status(200).send({ findAllOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
