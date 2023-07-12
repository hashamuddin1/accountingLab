//DATABASE CONNECTION
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://uhasham71:hasham147@cluster0.tmjujxa.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
