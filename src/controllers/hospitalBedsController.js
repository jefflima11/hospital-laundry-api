import { getHospitalBeds as getHospitalBedsModel, getHospitalBedsId as getHospitalBedsIdModel, getHospitalBedsStatus as getHospitalBedsStatusModel} from "../models/hospitalBedsModel.js"

export async function getHospitalBeds(req, res, next) {
    try {
        const beds = await getHospitalBedsModel();
        res.json(beds);
        // res.json("teste");
    } catch (err) {
        next(err);
    };
};

export async function getHospitalBedsId (req, res, next) {
    const { id } = req.params;
    
    try {
        const beds = await getHospitalBedsIdModel(id);
        res.json(beds);
    } catch (err) {
        next(err);
    };
};

export async function getHospitalBedsStatus (req, res, next)  {
    try {
        const status = await getHospitalBedsStatusModel();
        res.json(status);
    } catch (err) {
        next(err);
    };
}