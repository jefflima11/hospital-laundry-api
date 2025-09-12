import { Router } from "express";
import patientRoutes from "./patientRoutes.js";

const router = Router();

router.use("/patients", patientRoutes);
router.use("/teste", (req, res) => res.send("teste2"))
router.use("/teste2", (req, res) => res.send("teste3"))

export default router; 