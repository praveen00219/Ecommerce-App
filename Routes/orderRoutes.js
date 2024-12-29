const express = require("express");

const orderController = require("../Controller/orderController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/",authMiddleware(["admin","buyer","seller"]) ,orderController.createOrder);

router.get("/",authMiddleware(["admin","buyer","seller"]), orderController.getOrder);

router.post("/payment/payment-status", (req, res) => {
  const body = req.body;
});

module.exports = router;