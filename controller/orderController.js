const { orders } = require("../model/order");
const { ObjectId } = require("mongodb");

const createOrder = async (req, res) => {
  try {
    const addOrder = new orders({
      user_id: req.query.user_id,
      customer_name: req.body.customer_name,
      product_name: req.body.product_name,
      price: req.body.price,
      delivery_date: req.body.delivery_date,
      payment: req.body.payment,
    });

    const data = await addOrder.save();
    return res.send({
      status: 200,
      message: "Order of User has been created",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const fetchOrder = async (req, res) => {
  try {
    const data = await orders.find({
      user_id: new ObjectId(req.query.user_id),
    });

    return res.send({
      status: 200,
      message: "Orders of User has been fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
module.exports = { createOrder, fetchOrder };
