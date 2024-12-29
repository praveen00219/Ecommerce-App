const productModel = require("../Model/productModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createProduct = async (req, res) => {
  
    const newProduct = new productModel(req.body);

    await newProduct.save();

    return res.json({
      sucess: true,
      message: "product added sucessFully",
    });
   
};

const getProduct = async (req, res) => {
  const allProducts=await productModel.find();
  res.json({
    sucess: true,
    message: "All products ",
    data:allProducts
  });
};

const editProduct = async (req, res) => {
  const product=req.body;
  const setObject = {};

  if (product.title) {
    setObject["title"] = product.title;
  }

  if (product.description) {
    setObject["description"] = product.description;
  }

  if (product.price) {
    setObject["price"] = product.price;
  }

  if (product.category) {
    setObject["category"] = product.category;
  }
  if (product.brand) {
    setObject["brand"] = product.brand;
  }
  if (product.stock) {
    setObject["stock"] = product.stock;
  }


  const updateObject = {
    $set: setObject,
  };
  const updated=await productModel.findByIdAndUpdate(product.id,updateObject);
    res.json({
        sucess: true,
        message: "product updated successfully",
        updated:updated,
      });
};

const likeDisLikeProduct=async(req,res)=>{
  const product=await productModel.findById(req.body.productId);
 let actionAlreadyTaken=product[req.params.action].find((id)=>id.toString()==req.user._id.toString());

 
 if(actionAlreadyTaken){
    let action=req.params.action;
    const updatedproduct= await productModel.findByIdAndUpdate(req.body.productId, { $pull:{[action]:req.user._id}
    },{new:true})
   return  res.json({
      sucess:true,
      message: "already: "+req.params.action+" hence undo action ,same user can like only once",
      [req.params.action]:updatedproduct[req.params.action].length,
  
  })
    
 }


let updateObject={ 
  $push:{likes:req.user._id},
  $pull:{dislikes:req.user._id}
}
if(req.params.action==="dislikes"){
  updateObject={
    $push:{dislikes:req.user._id},
    $pull:{likes:req.user._id}
  }
}
 const updatedproduct= await productModel.findByIdAndUpdate(req.body.productId, updateObject,{new:true})

  res.json({
    sucess:true,
    message: req.params.action+" successfully",
    [req.params.action]:updatedproduct[req.params.action].length,

}
  )
}

const productDetails=async(req,res)=>{
  const productdetails=await productModel.findById(req.query.productId).populate("likes").populate("dislikes").populate("reviews");
    res.json({
      sucess:true,
      message:"product details",
      details:productdetails
    })
}

const reviewController=async(req,res)=>{
  try {

    const product = await productModel.findById(req.params.productId);
    const review = product.reviews.find(
      (review) => review.userId.toString() === req.user._id.toString()
    );

    if (review) {

      const findObject = {
        reviews: {
          $elemMatch: {
            userId: req.user._id,
            rating: review.rating,
          },
        },
      };

      const updateObject = {
        $set: {
          "reviews.$.rating": req.body.rating,
          "reviews.$.comment": req.body.comment,
        },
      };

      const updateResult = await productModel.updateOne(
        findObject,
        updateObject
      );
    } else {
      // Add review
      const updateObject = {
        $push: {
          reviews: {
            rating: req.body.rating,
            comment: req.body.comment,
            userId: req.user._id,
          },
        },
      };
      const updatedRecord = await productModel.findByIdAndUpdate(
        req.params.productId,
        updateObject,
        {
          new: true,
        }
      );
    }

    res.json({
      success: true,
      message: "Product review saved successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "internal server error occured",
    });
  }
}
  
const deleteProduct=async(req,res)=>{
  const product=await productModel.findByIdAndDelete(req.query.productId);
  res.json({
    success:true,
    message:"deleted product",
    deletedProduct:product
  })
}

const controllers = {
  getProduct,
  createProduct,
  editProduct,
  likeDisLikeProduct,
  productDetails,
  reviewController,

  deleteProduct
};

module.exports = controllers;
