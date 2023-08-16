const { Cash } = require("../model/cash");
const { products } = require("../model/product");
const { orders } = require("../model/order");
const { ObjectId } = require("mongodb");

const createCash = async (req, res) => {
  try {
    const addCash = new Cash({
      user_id: req.query.user_id,
      amount: req.body.amount,
      date: req.body.date,
    });

    const data = await addCash.save();
    return res.send({
      status: 200,
      message: "Cash of User has been created",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const fetchCash = async (req, res) => {
  try {
    const data = await Cash.find({
      user_id: new ObjectId(req.query.user_id),
    });

    const productData = await products.find({
      user_id: new ObjectId(req.query.user_id),
      payment: "pending",
    });

    const orderData = await orders.find({
      user_id: new ObjectId(req.query.user_id),
      payment: "done",
    });

    let totalCash = 0;
    for (let i = 0; i < data.length; i++) {
      totalCash += data[i].amount;
    }

    let totalDebt = 0;
    for (let i = 0; i < productData.length; i++) {
      totalDebt += productData[i].price;
    }

    let totalProfit = 0;
    for (let i = 0; i < orderData.length; i++) {
      totalProfit += orderData[i].price;
    }

    return res.send({
      status: 200,
      message: "Cash Record of User has been fetched",
      totalCash,
      totalDebt,
      totalProfit,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const balanceSheet = async (req, res) => {
  const userId = req.query.user_id;

  const cashData = await orders.find({
    user_id: new ObjectId(userId),
    payment: "done",
  });

  const productsData = await products.find({
    user_id: new ObjectId(userId),
    payment: "done",
  });

  const liabilityData = await products.find({
    user_id: new ObjectId(userId),
    payment: "pending",
  });

  const equityData = await Cash.find({
    user_id: new ObjectId(userId),
  });

  let totalCash = 0;
  for (let i = 0; i < cashData.length; i++) {
    totalCash += cashData[i].amount;
  }

  let totalLiability = 0;
  for (let i = 0; i < liabilityData.length; i++) {
    totalLiability += liabilityData[i].price;
  }

  let totalEquity = 0;
  for (let i = 0; i < equityData.length; i++) {
    totalEquity += equityData[i].amount;
  }

  let totalProduct = 0;
  for (let i = 0; i < productsData.length; i++) {
    totalProduct += productsData[i].price;
  }

  return res.send({
    status: 200,
    message: "Balance Sheet of User has been fetched",
    totalCash,
    totalProduct,
    totalLiability,
    totalEquity,
  });
};

module.exports = { createCash, fetchCash, balanceSheet };
