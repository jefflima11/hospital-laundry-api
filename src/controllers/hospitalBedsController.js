import { getHospitalBeds as getHospitalBedsModel } from "../models/hospitalBedsModel.js"

export async function getHospitalBeds(req, res, next) {
    try {
        const beds = await getHospitalBedsModel()
        res.json(beds);
    } catch (err) {
        next(err);
    }
}