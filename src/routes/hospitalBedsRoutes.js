import { Router } from "express";
import { getHospitalBeds, getHospitalBedsId, getHospitalBedsStatus, getCleaningHospitalBeds, patchCleaningRequest, getCleaningRequest, confirmCleaningRequest, refuseCleaningRequest } from "../controllers/HospitalBedsController.js";

const router = Router();

/**
 * @openapi
 * /api/hospital-beds:
 *   get:
 *     summary: Lista todos os leitos e seus respectivos status
 *     tags:
 *       - Leitos
 *     
 *     responses:
 *       200:
 *         description: Retorna a lista dos leitos e seus respectivos status
 */
router.get("/", getHospitalBeds);

/**
 * @openapi
 * /api/hospital-beds/id/{id}:
 *   get:
 *     summary: Busca o leito pelo id
 *     tags:
 *       - Leitos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id do leito
 *     responses:
 *       200:
 *         description: Retorna a lista dos leitos e seus respectivos status
 */
router.get("/id/:id",  getHospitalBedsId);

/**
 * @openapi
 * /api/hospital-beds/status:
 *   get:
 *     summary: Busca o quantitativo de leitos
 *     tags:
 *       - Leitos
 *     responses:
 *       200:
 *         description: Quantitativo de leitos e seus status por unidade de internação
 */
router.get("/status", getHospitalBedsStatus);

/**
 * @openapi
 * /api/hospital-beds/status/{id}:
 *   get:
 *     summary: Busca o quantitativo de leitos por posto
 *     tags:
 *       - Leitos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id do posto
 *     responses:
 *       200:
 *         description: Quantitativo de leitos e seus status apenas na unidade de internação solicitada
 */
router.get("/status/:post", getCleaningHospitalBeds);

/**
 * @openapi
 * /api/hospital-beds/cleaning-request:
 *   get:
 *     summary: Busca as solicitações de limpeza
 *     tags:
 *       - Solicitações de limpeza
 *     responses:
 *       200:
 *         description: Retorna as solicitações de limpeza que não estão aguardando confirmação
 */
router.get("/cleaning-request", getCleaningRequest);

/**
 * @openapi
 * /api/hospital-beds/cleaning-request/{id}:
 *   patch:
 *     summary: Altera o status da solicitação
 *     tags:
 *       - Solicitações de limpeza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id da solicitação
 *     responses:
 *       200:
 *         description: Solicitação repassada a proxima etapa
 *       401:
 *         description: Solicitação já se encontra dispónivel para confirmação
 */
router.patch("/cleaning-request/:request", patchCleaningRequest);

/**
 * @openapi
 * /api/hospital-beds/confirm-cleaning-request/{id}:
 *   patch:
 *     summary: Confirmação de limpeza
 *     tags:
 *       - Solicitações de limpeza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id da solicitação
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
 *               employee:
 *                 type: string
 *                 example: 40028922
 *               observation:
 *                 type: string
 *                 example: teste123teste321
 *     responses:
 *       200:
 *         description: Solicitação confirmada
 *       401:
 *         description: Solicitação não se encontra disponivel para confirmação
 */
router.patch("/confirm-cleaning-request/:request", confirmCleaningRequest);

/**
 * @openapi
 * /api/hospital-beds/refuse-cleaning-request/{id}:
 *   patch:
 *     summary: Recusa a confirmação de limpeza
 *     tags:
 *       - Solicitações de limpeza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id da solicitação
 *     responses:
 *       200:
 *         description: Solicitação recusada
 *       401:
 *         description: Solicitação não se encontra disponivel para recusa
 */
router.patch("/refuse-cleaning-request/:request", refuseCleaningRequest);

export default router;