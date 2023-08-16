const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cash_schema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "users",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

//creating collection
const Cash = new mongoose.model("cash", cash_schema);

//export collection
module.exports = { Cash };
