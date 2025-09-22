import { Router } from "express";
import { getInfos, getStatusLaundry, getEmployee } from "../controllers/infoController.js";

const router = Router();

/**
 * @openapi
 * /api/infos:
 *   get:
 *     summary: Informações gerais
 *     tags:
 *       - informações gerais
 *     responses:
 *       200:
 *         description: Informaão da empresa e do usuario logado
 */
router.get("/", getInfos);

/**
 * @openapi
 * /api/infos/status-laundry:
 *   get:
 *     summary: Tipos de status de limpeza
 *     tags:
 *       - informações gerais
 *     responses:
 *       200:
 *         description: Todos os status de limpeza
 */
router.get("/status-laundry", getStatusLaundry);

/**
 * @openapi
 * /api/infos/employee:
 *   get:
 *     summary: Funcionarios permitidos para higienização
 *     tags:
 *       - informações gerais
 *     responses:
 *       200:
 *         description: Retorna os usuarios cadastrados para atender solicitações de higienização
 */
router.get("/employee", getEmployee)

export default router;