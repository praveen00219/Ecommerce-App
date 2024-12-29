const blogModel=require("../Model/blogModel");


const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await blogModel.find();
        if(blogs){
           return res.json({
                success:true,
                blogs:blogs
            })
        }
         res.json({
            success:false ,
            message:"no blogs are available"
        })

    }catch(e){
        res.json({
            success:false,
            message:e.message

        })
    }

}

const getBlog=async(req,res)=>{
    try{
        const blog=await blogModel.findById(req.body.blogId);
        if(blog){
            return res.json({
                success:true,
                blog:blog
            })
        }
         res.status(404).json({
            success:false,
            message:"no blog is available with this id"

        })
    }catch(e){
        res.json({
            success:false,
            message:e.message

        })
    }
    
}

const updateBlog=async(req,res)=>{
    try{
        console.log(req.query)
        const updatedBlog=await blogModel.findByIdAndUpdate(req.query.blogId,req.body,{new:true});
        console.log(updatedBlog)
        res.json(
            {
                success:true,
                message:"blog updated successfully",
                updatedBlog:updatedBlog
            }
        )
    } catch (error) {
        res.json({
            success:false,
            err : error.message
        });
      }
    
}

const deleteBlog=async(req,res)=>{
    try{
        console.log(req.query)
        const deletedBlog=await blogModel.findByIdAndDelete(req.query.blogId);
        console.log(deletedBlog)
        res.json(
            {
                success:true,
                message:"blog deleted successfully",
                deletedBlog:deletedBlog
            }
        )
    } catch (error) {
        res.json({
            success:false,
            err : error.message
        });
      }
    
}


const createBlog=async(req,res)=>{
    const blog=req.body;
    try {
        const newBlog = await blogModel.create(blog);
        res.json(
            {
                success:true,
                message:"blog created successfully",
                blog:newBlog
            }
        );
      } catch (error) {
        res.json({
            success:false,
            err : error.message
        });
      }
    
}


const controller={
    getAllBlogs,
    getBlog,
    updateBlog,
    createBlog,
    deleteBlog
}

module.exports=controller;