const express=require("express")
const dotenv=require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRoutes=require("./Routes/userRoute");
const productRoutes=require("./Routes/productRoute");
const cartRoutes=require("./Routes/cartRoutes");
const couponRoutes=require("./Routes/couponRoutes");
const orderRoutes=require("./Routes/orderRoutes");
const blogRoutes=require("./Routes/blogRoutes");
const brandRoutes=require("./Routes/brandRoutes");
const categoryRoutes=require("./Routes/categoryRoutes");
const RateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");



const app =express();
dotenv.config();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const limiter = RateLimit({
    store: new MongoStore({
      uri: process.env.DB_URL,
      expireTimeMs: 10* 60 * 1000,
    }),
    windowMs: 10* 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Please try again after 10 mins",
    },
  });
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(limiter);

mongoose.connect(process.env.DB_URL).then(
    ()=>{
        console.log("connnected succefully");
    }

).catch((e)=> {console.log("rejected" ,e)});


//  app.use(express.json());

app.use("/api/v1/user/",userRoutes);
app.use("/api/v1/product/",productRoutes);
app.use("/api/v1/cart",cartRoutes);
app.use("/api/v1/coupon",couponRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/blog",blogRoutes);
app.use("/api/v1/brand",brandRoutes);
app.use("/api/v1/category",categoryRoutes);

app.listen(10000,()=>{
    console.log("running fine");
})