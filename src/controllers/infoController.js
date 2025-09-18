import { getInfos as getInfosModel } from "../models/infoModel.js";

export async function getInfos(req, res, next) {
    
    try {
        const infos = await getInfosModel();
        res.json({
            empresa: infos[0][0], 
            userLogged: req.user.user
        });
    } catch (err) {
        next(err);
    }
}

export async function getStatusLaundry(req, res, next) {
    try {
        const text = [
            ['PARA HIGIENIZACAO'],
            ['EM HIGIENIZACAO'],
            ['POS HIGIENIZACAO'],
            ['MANUTENCAO'],
            ['ROUPARIA']
        ];
        res.json(text)
    } catch (err) {
        next (err);
    };
};

