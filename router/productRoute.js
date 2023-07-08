const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  fetchProduct,
} = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");

productRouter.post("/api/v1/create/product", [verifyToken], createProduct);
productRouter.get("/api/v1/fetch/product", [verifyToken], fetchProduct);

module.exports = productRouter;
