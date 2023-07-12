const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");

require("./config/db");
const userRouter = require("./router/userRoute");
const subscriptionRouter = require("./router/subscriptionRoute");
const customerRouter = require("./router/customerRoute");
const productRouter = require("./router/productRoute");
const orderRouter = require("./router/orderRoute");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use([
  userRouter,
  subscriptionRouter,
  customerRouter,
  productRouter,
  orderRouter,
]);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Our Server is running at port ${port}`);
  });
});
