const jwt = require("jsonwebtoken");
const userModel=require("../Model/userModel")
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware=(role)=>async(req,res,next)=>{
    try {
      const token=req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token);
    const user=await userModel.findById(payload.id);
      const verifiedData = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      );

      if(role.includes(payload.role)){
        req.user=user;
        next();
      }else{
        res.status(403).json({
            success:false,
            message:"not a Authenticated user only "+role+"  is allowed to access",
          })
      }
     
    } catch (e) {
      console.log("error", e);
      res.status(403).json({
        success:false,
        message:"forbidden token expired"
      })
    }
}

module.exports=authMiddleware;

 