const CouponModel = require("../Model/couponModel");

const createCoupon = async (req, res) => {
  console.log(req.body);
  await CouponModel.create(req.body);
  res.json({
    success: true,
    message: "Coupon created scucessfully",
  });
};

const getCoupon = async (req, res) => {
  const couponsList = await CouponModel.find({ isActive: true });
  res.json({
    success: true,
    message: "List of coupons",
    result: couponsList,
  });
};


const updateCoupon = async (req, res) => {
    const coupon = await CouponModel.findByIdAndUpdate(req.query.couponId,req.body,{new:true});
    res.json({
      success: true,
      message: "updated coupons",
      result: coupon,
    });
  };

  const deleteCoupon = async (req, res) => {
    const coupon = await CouponModel.findByIdAndDelete(req.query.couponId);
    res.json({
      success: true,
      message: "deleted coupons",
    deletedCoupon: coupon,
    });
  };
const controllers = {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon
};

module.exports = controllers;