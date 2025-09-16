import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus } from "../controllers/HospitalBedsController.js";

const router = Router();

router.get("/", getHospitalBeds);
router.get("/id/:id",  getHospitalBedsId);
router.get("/status", getHospitalBedsStatus);

export default router;