const { users } = require("../model/user");
const { subscriptions } = require("../model/subscription");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSubscription = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
    });

   

    const createPayement = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.cardNumber,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
    });

    

    if (createPayement) {
      await stripe.paymentMethods.attach(createPayement.id, {
        customer: customer.id,
      });

      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: createPayement.id,
        },
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.PRICEID,
        },
      ],
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      trial_settings: {
        end_behavior: {
          missing_payment_method: "create_invoice",
        },
      },
    });

    let data;
    if (subscription) {
      const checkUser = await subscriptions.findOne({
        user_id: req.body.user_id,
      });
     
      if (checkUser!=null) {
        await subscriptions.findOneAndUpdate(
          { _id: new ObjectId(req.body.user_id) },
          { customer_id: customer.id },
          { new: true }
        );
        await users.findOneAndUpdate(
          { _id: new ObjectId(req.body.user_id) },
          { isValid: true },
          { new: true }
        );

        return res.send({
          status: 200,
          message: "Subscription of User has been Updated",
        });
      }
      data = new subscriptions({
        user_id: req.body.user_id,
        price: 5,
        customer_id: customer.id,
      });

      await data.save();

      await users.findOneAndUpdate(
        { _id: new ObjectId(req.body.user_id) },
        { isValid: true },
        { new: true }
      );
    }

    return res.send({
      status: 200,
      message: "Subscription of User has been created",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { createSubscription };
