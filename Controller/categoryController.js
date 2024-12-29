const categoryModel=require("../Model/categoryModel");

const createcategory=async(req,res)=>{
    try{
        const category=await categoryModel.create(req.body);
        res.json({
            sucess:true,
            message:"added successfully",
            category:category

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
}

const getcategory=async(req,res)=>{
    try{
        const category=await categoryModel.findById(req.body.categoryId);
        res.json({
            sucess:true,
            
            category:category

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
    
}

const getAllcategory=async(req,res)=>{
    try{
        const category=await categoryModel.find();
        res.json({
            sucess:true,
          
            category:category

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
    
}
const updatecategory=async(req,res)=>{
    try{
        const category=await categoryModel.findByIdAndUpdate(req.body.categoryId,{$set:{title:req.body.title}},{new :true});
        res.json({
            sucess:true,
            message:"updated successfully",
            category:category

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }

}

const deletecategory=async(req,res)=>{
    try{
    const category=await categoryModel.findByIdAndDelete(req.body.categoryId);
        res.json({
            sucess:true,
            message:"deleted successfully",
            Deletedcategory:category

        })
    }catch(e){
        res.json({
            success:false,
            err:e.message
        })
    }
}


const controller={
    getAllcategory,
    getcategory,
    createcategory,
    updatecategory,
    deletecategory
}

module.exports=controller;