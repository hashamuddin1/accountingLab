const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const customer_schema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    customer_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
})

//creating collection
const customers = new mongoose.model('customer', customer_schema)


//export collection
module.exports = { customers };