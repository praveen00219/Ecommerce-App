const express=require("express");
const categoryController=require("../Controller/categoryController");
const authMiddleware=require("../middleware/auth");

const router=express.Router();

router.post("/",authMiddleware(["admin"]),categoryController.createcategory);
router.get("/all",categoryController.getAllcategory);
router.get("/",categoryController.getcategory);

router.patch("/",authMiddleware(["admin"]),categoryController.updatecategory);
router.delete("/",authMiddleware(["admin"]),categoryController.deletecategory);


module.exports=router;