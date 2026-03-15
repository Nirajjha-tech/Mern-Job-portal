import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config({})
import connectdb from "./utils/db.js";
import UserRoute from "./route/user.route.js";
import companyRoute from "./route/company.route.js";
import jobRoute from './route/job.route.js'
import applicationRoute from './route/application.route.js';

const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsoptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsoptions))
app.use("/api/v1/user",UserRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)


app.listen(port,()=>{
    connectdb();
    console.log(`server is listening at port ${port}`);
})
