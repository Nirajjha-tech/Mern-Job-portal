import express from "express";
import isauthenticated from "../middlewares/isauthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
const router=express.Router();

router.route("/register").post(isauthenticated,registerCompany);
router.route("/get").get(isauthenticated,getCompany);
router.route("/get/:id").get(isauthenticated,getCompanyById);
router.route("/Update/:id").put(isauthenticated,updateCompany);
export default router;