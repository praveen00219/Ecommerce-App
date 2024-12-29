const express=require("express");
const productController=require("../Controller/productController")
const authMiddleware=require("../middleware/auth");
const router=express.Router();

router.post("/",authMiddleware(["admin"]),productController.createProduct)

router.patch("/",authMiddleware(["admin"]),productController.editProduct)
router.delete("/",authMiddleware(["admin"]),productController.deleteProduct)


router.get("/",productController.getProduct);
router.get("/product-by-id",productController.productDetails);
router.post("/:productId/review",authMiddleware(["buyer","seller","admin"]),productController.reviewController);

router.post("/:action",authMiddleware(["buyer","seller","admin"]),productController.likeDisLikeProduct);




module.exports= router;
