import { Router } from "express";
import { getInfos, getStatusLaundry, getEmployee } from "../controllers/infoController.js";
import path from "path";
import { authorize } from "../middlewares/authorize.js"

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
 * /api/infos/image:
 *   get:
 *     summary: Logo
 *     tags:
 *       - informações gerais
 *     responses:
 *       200:
 *         description: Retorna a logo
 *       404:
 *         description: imagem não encontrada
 */
router.get("/image", (req, res) => {
  const imgPath = path.join(process.cwd(), "src/img/logo.png");
  res.sendFile(imgPath, (err) => {
    if (err) {
      res.status(404).send("Imagem não encontrada");
    }
  });
});

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
router.get("/status-laundry", authorize(["A"]), getStatusLaundry);

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
router.get("/employee", authorize(["A","L"]), getEmployee)

export default router;