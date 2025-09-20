import { Router } from "express";
import { getInfos, getStatusLaundry, getEmployee } from "../controllers/infoController.js";

const router = Router();

router.get("/", getInfos);
router.get("/status-laundry", getStatusLaundry);

router.get("/employee", getEmployee)

export default router;