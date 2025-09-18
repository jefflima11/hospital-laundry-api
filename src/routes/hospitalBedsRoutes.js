import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus, getCleaningHospitalBeds } from "../controllers/HospitalBedsController.js";

const router = Router();

router.get("/", getHospitalBeds);
router.get("/id/:id",  getHospitalBedsId);
router.get("/status", getHospitalBedsStatus);
router.get("/status/:post", getCleaningHospitalBeds);

export default router;