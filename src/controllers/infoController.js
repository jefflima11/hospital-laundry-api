import { getInfos as getInfosModel } from "../models/infoModel.js";

export async function getInfos(req, res, next) {
    try {
        const infos = await getInfosModel();
        res.json(infos);
    } catch (err) {
        next(err);
    }
}