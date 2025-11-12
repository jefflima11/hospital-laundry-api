import { Router } from "express";
import login from "./loginRoutes.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import hospitalBedsRoutes from "./hospitalBedsRoutes.js"
import infoRoutes from "./infoRoutes.js"
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/login", login)
router.use("/users",authMiddleware, userRoutes);
router.use("/hospital-beds",authMiddleware, hospitalBedsRoutes);
router.use("/infos", authMiddleware, infoRoutes);

export default router; 