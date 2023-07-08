const { customers } = require("../model/customer");
const { ObjectId } = require("mongodb");

const createCustomer = async (req, res) => {
  try {
    const addCustomer = new customers({
      user_id: req.query.user_id,
      customer_name: req.body.customer_name,
      description: req.body.description,
    });

    const data = await addCustomer.save();
    return res.send({
      status: 200,
      message: "Customer of User has been created",
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const fetchCustomerByUser = async (req, res) => {
  try {
    const data = await customers.find({
      user_id: new ObjectId(req.query.user_id),
    });

    return res.send({
      status: 200,
      message: "Customer of User has been fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { createCustomer, fetchCustomerByUser };
