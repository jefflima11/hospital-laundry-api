import { getHospitalBeds as getHospitalBedsModel, getHospitalBedsId as getHospitalBedsIdModel, getHospitalBedsStatus as getHospitalBedsStatusModel, getCleaningHospitalBeds as getCleaningHospitalBedsModel} from "../models/hospitalBedsModel.js"

export async function getHospitalBeds(req, res, next) {
    try {
        const beds = await getHospitalBedsModel();
        res.json(beds);
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

export async function getCleaningHospitalBeds (req, res, next) {
    const { post } = req.params;

    try {
        const beds = await getCleaningHospitalBedsModel(post);
        res.json(beds);
    } catch (err) {
        next(err);
    };
 }