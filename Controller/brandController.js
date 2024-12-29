const brandModel=require("../Model/brandModel");

const createBrand=async(req,res)=>{
    try{
        const brand=await brandModel.create(req.body);
        res.json({
            sucess:true,
            message:"added successfully",
            brand:brand

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
}

const getBrand=async(req,res)=>{
    try{
        const brand=await brandModel.findById(req.body.brandId);
        res.json({
            sucess:true,
            message:"added successfully",
            brand:brand

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
    
}

const getAllBrand=async(req,res)=>{
    try{
        const brand=await brandModel.find();
        res.json({
            sucess:true,
            message:"added successfully",
            brand:brand

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
    
}
const updateBrand=async(req,res)=>{
    try{
        const brand=await brandModel.findByIdAndUpdate(req.body.brandId,{$set:{title:req.body.title}},{new :true});
        res.json({
            sucess:true,
            message:"updated successfully",
            brand:brand

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }

}

const deleteBrand=async(req,res)=>{
    try{
    const brand=await brandModel.findByIdAndDelete(req.body.brandId);
        res.json({
            sucess:true,
            message:"deleted successfully",
            brand:brand

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
}


const controller={
    getAllBrand,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}

module.exports=controller;
