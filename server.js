const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

require("./config/db");
const userRouter = require("./router/userRoute");
const subscriptionRouter = require("./router/subscriptionRoute");
const customerRouter = require("./router/customerRoute");
const productRouter = require("./router/productRoute");
const orderRouter = require("./router/orderRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use([
  userRouter,
  subscriptionRouter,
  customerRouter,
  productRouter,
  orderRouter,
]);

app.listen(port, () => {
  console.log(`Our Server is running at port ${port}`);
});
