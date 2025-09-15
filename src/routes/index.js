import { Router } from "express";
import patientRoutes from "./patientRoutes.js";
import hospitalBedsRoutes from "./hospitalBedsRoutes.js"
import infoRoutes from "./infoRoutes.js"

const router = Router();

router.use("/patients", patientRoutes);

router.use("/hospital-beds", hospitalBedsRoutes);

router.use("/infos", infoRoutes)

export default router; 