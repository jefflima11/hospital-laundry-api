import { Router } from "express";
import { getHospitalBeds } from "../controllers/HospitalBedsController.js";

const router = Router();

router.get("/", getHospitalBeds);

export default router;