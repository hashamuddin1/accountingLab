const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const subscription_schema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    customer_id: {
        type: String,
        required: true,
        trim: true
    },
    isExpire:{
        type:Boolean,
        default:false
    }

})

//creating collection
const subscriptions = new mongoose.model('subscription', subscription_schema)


//export collection
module.exports = { subscriptions };