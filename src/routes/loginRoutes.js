import { Router } from "express";
import { postLogin, patchAlterarSenha, patchInativarUsuario, deleteExcluirUsuario } from "../controllers/loginController.js";

const router = Router();

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: batataassada
 *               password:
 *                 type: string
 *                 example: carameloverde123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 */
router.post("/", postLogin);

export default router;