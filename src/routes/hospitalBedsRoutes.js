import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus, getCleaningHospitalBeds, patchCleaningRequest } from "../controllers/HospitalBedsController.js";

const router = Router();

router.get("/", getHospitalBeds);
router.get("/id/:id",  getHospitalBedsId);
router.get("/status", getHospitalBedsStatus);
router.get("/status/:post", getCleaningHospitalBeds);
router.patch("/cleaning-request/:request", patchCleaningRequest)

export default router;