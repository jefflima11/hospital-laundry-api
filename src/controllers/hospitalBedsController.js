import { getHospitalBeds as getHospitalBedsModel, getHospitalBedsId as getHospitalBedsIdModel, getHospitalBedsStatus as getHospitalBedsStatusModel, getCleaningHospitalBeds as getCleaningHospitalBedsModel, patchCleaningRequest as patchCleaningRequestModel, getCleaningRequest as getCleaningRequestModel, confirmCleaningRequest as confirmCleaningRequestModel} from "../models/hospitalBedsModel.js"

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
};

export async function getCleaningHospitalBeds (req, res, next) {
    const { post } = req.params;

    try {
        const beds = await getCleaningHospitalBedsModel(post);
        res.json(beds);
    } catch (err) {
        next(err);
    };
};

export async function patchCleaningRequest(req, res, next) {
    const { request } = req.params

    try {
        const updateRequest = await patchCleaningRequestModel(request);
        res.json(updateRequest)
    } catch(err) {
        next(err);
    };
};

export async function getCleaningRequest(req, res, next) {
    try {
        const cleaningRequests = await getCleaningRequestModel();
        res.json(cleaningRequests)
    } catch (err) {
        next(err);
    }
};

export async function confirmCleaningRequest(req, res, next) {

    const { request } = req.params;

    const binds = req.body;

    try {
        const confirmRequests = await confirmCleaningRequestModel(request, binds);
        res.json(confirmRequests);

    } catch(err) {
        next(err)
    };
};