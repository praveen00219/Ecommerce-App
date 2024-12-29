const express=require("express");
const authMiddleware=require("../middleware/auth")
const blogController=require("../Controller/blogController");

const router=express.Router();

router.get("/all",blogController.getAllBlogs);
router.get("/",blogController.getBlog);
router.post("/",authMiddleware(["admin"]),blogController.createBlog);
router.patch("/",authMiddleware(["admin"]),blogController.updateBlog);
router.delete("/",authMiddleware(["admin"]),blogController.deleteBlog)

module.exports=router;

