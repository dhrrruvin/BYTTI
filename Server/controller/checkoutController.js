const instance = require("../config/razorpayInstance");
const crypto = require("crypto");
const Payment = require("../models/payment");

const checkout = async (req, res) => {
  console.log(req.body.amount);
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error calling razorpay order");
    console.log(error);
    res.status(500).json({ success: false, data: "internal server error" });
  }
};

const paymentVerifcation = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      const resp = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      console.log(resp);
    } catch (error) {
      console.log("error creating payment data");
      console.log(error);
    }

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ success: false });
  }
};

const get_personal_key = async (req, res) => {
  res.status(200).json({ success: true, key: process.env.RAZORPAY_API_KEY });
};

module.exports = { checkout, paymentVerifcation, get_personal_key };
