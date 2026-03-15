import mongoose, { Schema } from "mongoose";
const companyschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    location:{
        type:String, 
    },
    logo:{
        type:String
    },
    website:{
        type:String
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

},{timestamps:true})
export const Company=mongoose.model("Company",companyschema)