import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { patchAlterarSenha, patchInativarUsuario } from "../controllers/loginController.js"

const router = Router();

/**
 * @openapi
 * /api/users/new-user:
 *   post:
 *     summary: Criação de usuarios
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee
 *               - observation
 *             properties:
 *               username:
 *                 type: string
 *                 example: CaioLima
 *               password:
 *                 type: string
 *                 example: teste123teste321
 *               name:
 *                 type: string
 *                 example: Caio Gustavo Lima
 *     responses:
 *       200:
 *         description: Solicitação confirmada
 *       401:
 *         description: Solicitação não se encontra disponivel para confirmação
 */
router.post("/new-user", createUser);

/**
 * @openapi
 * /api/users/change-password/{userName}:
 *   patch:
 *     summary: Altera a senha do usuário
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: 654321
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Erro ao alterar a senha
 */
router.patch("/change-password", patchAlterarSenha);

/**
 * @openapi
 * /api/users/inactivate/{userName}:
 *   patch:
 *     summary: Inativar usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuario inativado
 *       400:
 *         description: Não foi possivel inativar o usuario
 */
router.patch("/inactivate/:userName", patchInativarUsuario);

export default router; 