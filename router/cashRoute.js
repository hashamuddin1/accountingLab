const express = require("express");
const cashRouter = express.Router();
const {
  createCash,
  fetchCash,
  balanceSheet,
} = require("../controller/cashController");
const verifyToken = require("../middleware/verifyToken");

cashRouter.post("/api/v1/create/cash", [verifyToken], createCash);
cashRouter.get("/api/v1/fetch/cash", [verifyToken], fetchCash);
cashRouter.get("/api/v1/fetch/balnce/sheet", [verifyToken], balanceSheet);

module.exports = cashRouter;
