const { products } = require("../model/product");
const { ObjectId } = require("mongodb");

const createProduct = async (req, res) => {
  try {
    const addProduct = new products({
      user_id: req.query.user_id,
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
    });

    const data = await addProduct.save();
    return res.send({
      status: 200,
      message: "Product of User has been created",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const fetchProduct = async (req, res) => {
  try {
    const data = await products.find({
      user_id: new ObjectId(req.query.user_id),
    });

    return res.send({
      status: 200,
      message: "Products of User has been fetched",
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { createProduct, fetchProduct };
