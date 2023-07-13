const express = require("express");
const orderRouter = express.Router();
const {
  createOrder,
  fetchOrder,
  accountReceivable,
} = require("../controller/orderController");
const verifyToken = require("../middleware/verifyToken");

orderRouter.post("/api/v1/create/order", [verifyToken], createOrder);
orderRouter.get("/api/v1/fetch/order", [verifyToken], fetchOrder);
orderRouter.get(
  "/api/v1/fetch/account/receivable",
  [verifyToken],
  accountReceivable
);

module.exports = orderRouter;
