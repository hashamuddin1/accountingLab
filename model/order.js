const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const order_schema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "users",
  },
  customer_name: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  delivery_date: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    trim: true,
    required: true,
  },
});

//creating collection
const orders = new mongoose.model("order", order_schema);

//export collection
module.exports = { orders };
