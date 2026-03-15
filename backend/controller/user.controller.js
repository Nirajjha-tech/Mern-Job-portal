import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
    try{
        const{fullname,email,password,role,phonenumber}=req.body
        if(!fullname || !email || !password || !role || !phonenumber){
            return res.status(400).json({
                message:"Something is missing",
                success:true
            });
        };
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists with this email",
                success:false
            });
        };

        const hashedpassword=await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            password:hashedpassword,
            role,
            phonenumber

        })
        return res.status(201).json({
            message:"User registered successfully",
            success:true
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"User not created",
            success:false
        })
    }
}
    export const login=async(req,res)=>{
        try{
           const{ fullname,email,password,role}=req.body
            if( !email || !password || !role ){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
           let user=await User.findOne({email})
           if(!user){
            return res.status(400).json({
                message:'Email or password is invalid',
                success:false
            });
           }
           if(user){
            const isPasswordMatch=await bcrypt.compare(password,user.password)
            if(!isPasswordMatch){
               return res.status(400).json({
                message:'Email or password is invalid',
                success:false
            }); 
            }
           }

           if(role !==user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            }); 
           };
           const tokenData={
            userId:user._id
           }
           user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phonenumber:user.phonenumber
           }
           const token=await jwt.sign(tokenData,process.env.SecretKey,{expiresIn:'1d'});
           return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
           });
        }
       catch(error){
        console.log(error)
          return res.status(400).json({message:"Something is wrong",success:false})
       }
    }

   export const logout=async(req,res)=>{
    try{
         return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully",
            success:true
         })
    }
    catch{
        return res.status(400).json({message:"Something is wrong",success:false})
    }
   }

   export const updateProfile=async(req,res)=>{
    try{
        const{fullname,email,skills,bio,phonenumber}=req.body
        const file=req.file
        let skillsarray;
        if(skills){
            skillsarray=skills.split(',')
        }
        
        const UserId=req.id;
        let user=await User.findById(UserId)
        if(!user){
             return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        if(fullname) user.fullname=fullname
        if(email)user.email=email
        if(phonenumber)user.phonenumber=phonenumber
        if(bio)user.profile.bio=bio
        if(skills)user.profile.skills=skillsarray

        await user.save()
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phonenumber:user.phonenumber,
            profile:user.profile,
            
        }
        console.log(req.id);
        return res.status(200).json({
            message:"profile updated ssuccessfully",
            success:true,
            user
        });
    }
    catch(error){       
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
   }
