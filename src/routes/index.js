import { Router } from "express";
import patientRoutes from "./patientRoutes.js";
import hospitalBedsRoutes from "./hospitalBedsRoutes.js"

const router = Router();

router.use("/patients", patientRoutes);

router.use("/hospital-beds", hospitalBedsRoutes);

export default router; 