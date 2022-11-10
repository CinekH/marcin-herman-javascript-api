import express from "express";
import {
  getProductsList,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products-list", getProductsList);
router.get("/product/:id", getProduct);
router.put("/product-update", updateProduct);
router.post("/product-create", createProduct);
router.delete("/product-delete/:id", deleteProduct);

export default router;