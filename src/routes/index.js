import { Router } from "express";
import { login } from "../controllers/loginController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import patientRoutes from "./patientRoutes.js";
import hospitalBedsRoutes from "./hospitalBedsRoutes.js"
import infoRoutes from "./infoRoutes.js"
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/users", userRoutes);

router.post("/login", login)

router.use("/patients", patientRoutes);

router.use("/hospital-beds", hospitalBedsRoutes);

router.use("/infos", authMiddleware, infoRoutes)

export default router; 