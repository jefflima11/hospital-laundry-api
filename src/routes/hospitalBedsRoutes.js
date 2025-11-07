import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus, getCleaningHospitalBeds, patchCleaningRequest, getCleaningRequest, confirmCleaningRequest, refuseCleaningRequest, getRequestWaitingConfirmation } from "../controllers/HospitalBedsController.js";
import { authorize } from "../middlewares/authorize.js"

const router = Router();

router.get("/", getHospitalBeds);

router.get("/id/:id",  getHospitalBedsId);

router.get("/status", getHospitalBedsStatus);

router.get("/status/:post", getCleaningHospitalBeds);

router.get("/cleaning-request", getCleaningRequest);

router.get("/request-waiting-confirmation", authorize(["A","L"]), getRequestWaitingConfirmation)

router.patch("/cleaning-request/:request", patchCleaningRequest);

router.patch("/confirm-cleaning-request/:request", confirmCleaningRequest);

router.patch("/refuse-cleaning-request/:request", refuseCleaningRequest);

export default router;