const express = require("express");

const couponController = require("../Controller/couponController")
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware(["admin"]), couponController.createCoupon);
router.patch("/",authMiddleware(["admin"]),couponController.updateCoupon);
router.delete("/",authMiddleware(["admin"]),couponController.deleteCoupon);

router.get("/", couponController.getCoupon);

module.exports = router;