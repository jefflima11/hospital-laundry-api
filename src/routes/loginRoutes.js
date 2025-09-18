import { Router } from "express";
import { postLogin, patchAlterarSenha, patchInativarUsuario, deleteExcluirUsuario } from "../controllers/loginController.js";

const router = Router();

router.post("/", postLogin);
router.patch("/alterar-senha", patchAlterarSenha);
router.patch("/inativar", patchInativarUsuario);
router.delete("/excluir", deleteExcluirUsuario);

export default router;