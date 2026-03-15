import express from "express";

import isauthenticated from "../middlewares/isauthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";
const router=express.Router();

router.route("/post").post(isauthenticated,postJob);
router.route("/getjobs").post(isauthenticated,getAllJobs);
router.route("/getadminjobs").post(isauthenticated,getAdminJobs);
router.route("/get/:id").post(isauthenticated,getJobById)
export default router