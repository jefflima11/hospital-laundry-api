import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus, getCleaningHospitalBeds, patchCleaningRequest, getCleaningRequest, confirmCleaningRequest } from "../controllers/HospitalBedsController.js";

const router = Router();

router.get("/", getHospitalBeds);

router.get("/id/:id",  getHospitalBedsId);

router.get("/status", getHospitalBedsStatus);
router.get("/status/:post", getCleaningHospitalBeds);

router.get("/cleaning-request", getCleaningRequest);
router.patch("/cleaning-request/:request", patchCleaningRequest);

router.patch("/confirm-cleaning-request/:request", confirmCleaningRequest);

export default router;