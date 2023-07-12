const express = require("express");
const orderRouter = express.Router();
const { createOrder, fetchOrder } = require("../controller/orderController");
const verifyToken = require("../middleware/verifyToken");

orderRouter.post("/api/v1/create/order", [verifyToken], createOrder);
orderRouter.get("/api/v1/fetch/order", [verifyToken], fetchOrder);

module.exports = orderRouter;
