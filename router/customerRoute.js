const express = require("express");
const customerRouter = express.Router();
const {
  createCustomer,
  fetchCustomerByUser,
} = require("../controller/customerController");
const verifyToken = require("../middleware/verifyToken");

customerRouter.post("/api/v1/create/customer", [verifyToken], createCustomer);
customerRouter.get(
  "/api/v1/fetch/customer/by/userid",
  [verifyToken],
  fetchCustomerByUser
);

module.exports = customerRouter;
