const userModel = require("../Model/userModel");
const nodemailer = require('nodemailer');
const {sendEmailhandler} =require("../utils/sendmail.js")
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()

const userRegistration = async (req, res) => {
  try {
    console.log(req.body);

    const newuser = new userModel(req.body);
    await newuser.save();

    res.json({
      sucess: true,
      message: "registered successfully",
    });
  } catch (e) {
    res.json({
      sucess: false,
      message: "already registerd with emailed",
    });
  }
};

const userLogin = async (req, res) => {
    const user=await userModel.findOne({email:req.body.email})
    if(!user){
    return res.json({
            sucess: false,
            message: "Account doesn't exist",
        });
    }

    const isPasswordMatched = await bcrypt.compare(req.body.password,user.password)

    const expiryDateTime=Math.floor(new Date().getTime() /1000)+3600;
  if(isPasswordMatched){
    const payload={
        id:user._id,
        name:user.firstname,
        role:user.role,
        email:user.email,
        exp:expiryDateTime,

    }
     const token= jwt.sign(payload,process.env.JWT_SECRET_KEY)

    return res.json({
        sucess: true,
        message: "login successfully",
        token:token,
        data:user
    });

  }
  else{
    res.json({
        sucess: false,
        message: "invalid credential",
    });
  }
};

const userLogout = async (req, res) => {
  res.json({
    sucess: true,
    message: "logout successfully",
  });
};


const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    const resetPasswordLink = `http://localhost:10000/api/v1/user/reset-password/${email}`;
    try {
      console.log("trying to send \n")
      await sendEmailhandler(email, "forgot Password", `
      here is the link to reset the password ${resetPasswordLink}.
    `);

      res.status(200).json({ 
        sucess:true,
         message: "email is sent to reset password" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({success:false, message: "we are facing issuse while sending email" });
    }
  }
}

const resetPassword = async(req, res) => {
  console.log(req.params.email);
  const user = await userModel.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    user.password = req.body.password;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  }
}

const changePassword = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    console.log(tokenFromHeaders);
    console.log(jwt.decode(tokenFromHeaders))
    const { email } = jwt.decode(tokenFromHeaders);
    const user = await userModel.findOne({ email });
    console.log(user)
    console.log(req.body)

    const newPassword = req.body.newPassword;
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      console.log(true);
      user.password = newPassword;
      await user.save();
    }else{
      return res.status(403).json({ message: 'Password is not correct' });
    }
    res.status(200).json({ message: "password is changed successfully" });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "internal server error please try after some time" });
  }
}
  



const addProductToWishlist=async(req,res)=>{
  const updateObject = {
    $push: {
      wishlist: req.body.productId,
    },
  };
  await userModel.findByIdAndUpdate(req.user._id, updateObject);
  res.json({
    success: true,
    message: "Product added to wishlist",
  });
}
const getUserWishlist=async(req,res)=>{
  const user = await userModel.findById(req.user._id, "wishlist").populate(
    "wishlist",
    "title price"
  ); 
 
  res.json({
    sucess:true,
    message:"get to wishlist",
    result: user,
  })
}
const saveUserAddress = async (req, res) => {
  const address = req.body;
  const setObject = {};

  if (address.address) {
    setObject["address.address"] = address.address;
  }

  if (address.city) {
    setObject["address.city"] = address.city;
  }

  if (address.state) {
    setObject["address.state"] = address.state;
  }

  if (address.pincode) {
    setObject["address.pincode"] = address.pincode;
  }

  const updateObject = {
    $set: setObject,
  };

  const updateResult = await userModel.findByIdAndUpdate(
    req.user._id,
    updateObject
  );
  
  res.json({
    success: true,
    message: " Save address succesfully",
  });
};

const controllers = {
  userLogin,
  userLogout,
  userRegistration,
  forgotPassword,
  resetPassword,
  changePassword,
  addProductToWishlist,
  getUserWishlist,
  saveUserAddress
};

module.exports = controllers;
