import { getPatients as getPatientsModel } from "../models/patientModel.js";

export async function getPatients(req, res, next) {
    try {
        const patients = await getPatientsModel();
        res.json(patients);
    } catch (err) {
        next(err);
    }
}

