import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { getAllUsers, patchAlterarSenha, patchInativarUsuario } from "../controllers/loginController.js"

const router = Router();

router.get("/users", getAllUsers);

router.post("/new-user", createUser);

router.patch("/change-password", patchAlterarSenha);

router.patch("/inactivate/:userName", patchInativarUsuario);

export default router; 