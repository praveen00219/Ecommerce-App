const express=require("express");
const cartController=require("../Controller/cartController");
const authMiddleware=require("../middleware/auth");


const router=express.Router();

router.get("/",authMiddleware(["admin","buyer","seller"]),cartController.getCart);
router.post("/",authMiddleware(["admin","buyer","seller"]),cartController.createCart);

module.exports=router