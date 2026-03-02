import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UserModel } from "./db";
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
const app=express(); 
const JWT_PASSWORD="123456789";
app.use(express.json());
app.post("/api/v1/signup", async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{

    
    await UserModel.create({
        username:username,
        password:password
    })

    res.json({
        message:"User signed up"
    })
}catch(e){
    res.status(400).json({
        message : "User already exists"
    })
}
})
app.post("/api/v1/signin" , async (req,res)=>{
    const username=req.body.username;
    const password = req.body.password;
    const existingUser =await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token=jwt.sign({
            id:existingUser._id},JWT_PASSWORD);
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})
app.post("/api/v1/content" , (req,res)=>{
    
})
app.get("/api/v1/content" , (req,res)=>{
    
})
app.delete("/api/v1/content" , (req,res)=>{
    
})
app.post("/api/v1/brain/share",(req,res)=>{

})
app.get("/api/v1/brain/:sharelink",(req,res)=>{
    
})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});


