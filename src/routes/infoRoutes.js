import { Router } from "express";
import { getInfos } from "../controllers/infoController.js";

const router = Router();

router.get("/", getInfos);
router.get("/status-laundry", (req, res, next) => {
    try {
        const text = [
            ['PARA HIGIENIZACAO'],
            ['EM HIGIENIZACAO'],
            ['POS HIGIENIZACAO'],
            ['MANUTENCAO'],
            ['ROUPARIA']
        ];
        res.send(text)
    } catch (err) {
        next (err);
    };
});

export default router;