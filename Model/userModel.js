const mongoose =require("mongoose")
const bcrypt=require("bcryptjs")


const addressSchema = new mongoose.Schema({
    address: {
      type: String,
      required: false,
      deault: "",
    },
    city: {
      type: String,
      requied: false,
      default: "",
    },
    state: {
      type: String,
      requied: false,
      default: "",
    },
    pincode: {
      type: String,
      requied: false,
      default: "",
    },
  });
const userSchema=new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
        }
        ,
        lastname:{
            type:String,
            required:true
    
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
       password:{
            type:String,
           required:true
        },
        role:{
            type:String,
           required:true
        },
        wishlist: {
            type: [mongoose.Schema.Types.ObjectId],
            default: [],
            ref: "products",
          },
          address: {
            type: addressSchema,
          },
    }
);


userSchema.pre("save",async function(){
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
})

const userModel=mongoose.model("users",userSchema);
module.exports= userModel