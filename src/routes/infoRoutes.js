import { Router } from "express";
import { getInfos, getStatusLaundry } from "../controllers/infoController.js";

const router = Router();

router.get("/", getInfos);
router.get("/status-laundry", getStatusLaundry);

export default router;