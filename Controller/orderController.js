const orderModel=require("../Model/orderModel")
const productModel=require("../Model/productModel")
const couponModel=require("../Model/couponModel")
const dayjs=require("dayjs");
const dotenv=require("dotenv");
dotenv.config();

const cartModel=require("../Model/cartModel")

const Razorpay=require("razorpay");
const razorpay=new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
})


const createOrder=async(req,res)=>{
   try{
        //get user cart first

    const userCart = await cartModel.findOne({ userId: req.user._id });
    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "Empty cart, please add items to cart",
      });
    }
    // --------------check coupon--
  
    const couponCode = req.body.coupon;
    const coupon = await couponModel.findOne({ couponCode, isActive: true });
    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code",
      });
    }
    const couponStartDate = dayjs(coupon.startDate);
    const couponEndDate = dayjs(coupon.endDate);
    const currentDateTime = dayjs();
  
    if (
      currentDateTime.isBefore(couponStartDate) ||
      currentDateTime.isAfter(couponEndDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    //----------------coupon discount
    let couponDiscountInRs = (
        (userCart.cartTotal / 100) *
        coupon.discountPercentage
      ).toFixed(2);
    
      if (couponDiscountInRs > coupon.maxDiscountInRs) {
        couponDiscountInRs = coupon.maxDiscountInRs;
      }

      //-------------amount to be paid
      const amount = (userCart.cartTotal - couponDiscountInRs).toFixed(2); // Total payable amount

      //--------deliver address
  let deliveryAddress = req.body.deliveryAddress;
  if (!deliveryAddress) {
    deliveryAddress = req.user.address;
  }


  //-------------delivery date----
  const deliveryDate = dayjs().add(7, "day");

  //---------Order details
  const orderDetails = {
    cart: userCart,
    userId: req.user._id,
    amount,
    coupon: coupon._id,
    deliveryAddress,
    orderPlacedAt: currentDateTime,
    deliveryDate,
    orderStatus: "Placed",
    modeOfPayment: req.body.modeOfPayment,
  };

  const newOrder = await orderModel.create(orderDetails);
  let pgResponse;
  if (req.body.modeOfPayment === "COD") {
    
  } else {
    
    const options = {
      amount: amount * 100, // Amount in paisa E.g 50Rs = 5000
      currency: "INR",
      receipt: newOrder._id, 
      payment_capture: 1, 
    };
    console.log("OPITONS", options);
    try {
      pgResponse = await razorpay.orders.create(options);
      console.log("RAZORPAY pgResponse", pgResponse);
    } catch (err) {
      console.log(err);
    }
  }

  res.json({
    success: true,
    message: "Order placed successfully",
    orderId: newOrder._id,
    paymentInformation: {
      amount: pgResponse.amount_due,
      orderId: pgResponse.id,
      currency: pgResponse.currency,
    },

    
   
  });
  
   }
   catch(e){
          console.log(e);
          res.json({
            success:false,
            message:"something went wrong please try again after some time"
          })
   }

}

const getOrder=async(req,res)=>{
    const order=await orderModel.find({userId:req.user._id});
    if(order){
       return res.json({
            success:true,
            message:"your order details",
            data:order
        })
    }

    res.json({
        success:false,
        message:"you have not ordered yet"
    })
    
}

const controller={
    getOrder,
    createOrder,
}

module.exports=controller;