const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const product_schema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "users",
  },
  product_name: {
    type: String,
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    trim: true,
    required: true,
  },
});

//creating collection
const products = new mongoose.model("product", product_schema);

//export collection
module.exports = { products };
