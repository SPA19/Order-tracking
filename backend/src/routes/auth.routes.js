import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  create_product,
  products,
  getAllOrders,
  create_order,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

// productos
router.post("/create_product", create_product)

router.get( "/products", products);

router.post("/create_order", create_order);

router.get("/getAllOrders", getAllOrders);

export default router;
