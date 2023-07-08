const express = require("express");
const subscriptionRouter = express.Router();
const { createSubscription } = require("../controller/subscriptionController");

subscriptionRouter.post("/api/v1/create/subscription", createSubscription);

module.exports = subscriptionRouter;
