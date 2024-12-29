const CartModel=require("../Model/cartModel");
const ProductModel=require("../Model/productModel");


const getCart=async(req,res)=>{
    const cart=await CartModel.find({userId:req.user._id});
    res.json({
        success:true,
        message:"your cart",
        data:cart

    })
  

}

const createCart=async(req,res)=>{
    console.log(req.body.products);
    const userCart = await CartModel.findOne({ userId: req.user._id });
    if (userCart) {
      userCart.remove();
    } 
      // Cart doesn't exists
      let cartTotal = 0;
      const productsToAdd = [];
      for (let i = 0; i < req.body.products.length; i++) {
        const currentProduct = req.body.products[i];
        const { price } = await ProductModel.findById(currentProduct.productId, {
          price: 1,
          _id: 0,
        });
  
        const product = {
          ...currentProduct,
          price,
        };
        productsToAdd.push(product);
        const priceForProduct = currentProduct.quantity * price;
        cartTotal += priceForProduct;
      }
  
     const newCart= await CartModel.create({
        products: productsToAdd,
        cartTotal: cartTotal,
        userId: req.user._id,
      });
    
    res.json({
      success: true,
      message: "User cart updated successfully",
      data:{
        products: productsToAdd,
        cartTotal: cartTotal,
        userId: req.user._id,
      }
    });
}

const controller={
    createCart,
    getCart
}
module.exports=controller;


