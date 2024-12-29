const express=require("express");
const brandController=require("../Controller/brandController");
const authMiddleware=require("../middleware/auth");

const router=express.Router();

router.post("/",authMiddleware(["admin"]),brandController.createBrand);
router.get("/all",brandController.getAllBrand);
router.get("/",brandController.getBrand);

router.patch("/",authMiddleware(["admin"]),brandController.updateBrand);
router.delete("/",authMiddleware(["admin"]),brandController.deleteBrand);


module.exports=router;