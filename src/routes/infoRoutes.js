import { Router } from "express";
import { getInfos } from "../controllers/infoController.js";

const router = Router();

router.get("/", getInfos);

export default router;