const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  fetchProduct,
  accountPayable,
} = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");

productRouter.post("/api/v1/create/product", [verifyToken], createProduct);
productRouter.get("/api/v1/fetch/product", [verifyToken], fetchProduct);
productRouter.get(
  "/api/v1/fetch/account/payable",
  [verifyToken],
  accountPayable
);

module.exports = productRouter;
