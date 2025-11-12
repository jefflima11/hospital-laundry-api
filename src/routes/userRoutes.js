import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { getAllUsers, patchAlterarSenha, patchInativarUsuario } from "../controllers/loginController.js"
import { authorize } from "../middlewares/authorize.js"

const router = Router();

router.get("/users", authorize(["A", "L"]), getAllUsers);

router.post("/new-user", authorize(["A"]), createUser);

router.patch("/alter-password", authorize(["A"]), patchAlterarSenha);

router.patch("/inactivate/:userName", authorize(["A"]), patchInativarUsuario);

export default router; 