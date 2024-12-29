const express=require("express");
const userController=require("../Controller/userController")
const authMiddleware=require("../middleware/auth")

const router=express.Router();
router.post("/register",userController.userRegistration)

router.post("/login",userController.userLogin)

router.post("/logout",userController.userLogout)

router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:email",userController.resetPassword);

router.post("/change-password",authMiddleware(["seller","admin","buyer"]), userController.changePassword);

 
router.post(
    "/wishlist",
    authMiddleware(["admin", "seller", "buyer"]),
    userController.addProductToWishlist
  );
  
  router.get(
    "/wishlist",
    authMiddleware(["seller", "buyer", "admin"]),
    userController.getUserWishlist
  );


  router.post(
    "/address",
    authMiddleware(["seller", "buyer", "admin"]),
    userController.saveUserAddress
  );
module.exports= router;

