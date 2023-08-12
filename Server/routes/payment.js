const router = require("express").Router();
const {
  checkout,
  paymentVerifcation,
  get_personal_key,
} = require("../controller/checkoutController");

router.post("/checkout", checkout);
router.post("/paymentVerification", paymentVerifcation);
router.get("/getKey", get_personal_key);

module.exports = router;
