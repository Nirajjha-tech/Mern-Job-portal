import express from "express";
import isauthenticated from "../middlewares/isauthenticated.js";
import { applyJob, getApplicants, getappliedjobs, UpdateStatus } from "../controller/application.controller.js";

const router=express.Router();

router.route("/apply/:id").post(isauthenticated,applyJob);
router.route("/getappliedjobs").get(isauthenticated,getappliedjobs);
router.route("/:id/applicants").get(isauthenticated,getApplicants);
router.route("/status/:id/Update").post(isauthenticated,UpdateStatus);

export default router;