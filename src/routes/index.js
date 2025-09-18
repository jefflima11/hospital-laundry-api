import { Router } from "express";
import { login } from "../controllers/loginController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import patientRoutes from "./patientRoutes.js";
import hospitalBedsRoutes from "./hospitalBedsRoutes.js"
import infoRoutes from "./infoRoutes.js"
import userRoutes from "./userRoutes.js";

const router = Router();

router.post("/login", login)

router.use("/users",authMiddleware, userRoutes);

router.use("/patients",authMiddleware, patientRoutes);

router.use("/hospital-beds",authMiddleware, hospitalBedsRoutes);

router.use("/infos", authMiddleware, infoRoutes)

export default router; 