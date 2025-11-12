import { postLogin as postLoginModel, getAllUsers as getAllUsersModel, patchInativarUsuario as patchInativarUsuarioModel, patchAlterarSenha as patchAlterarSenhaModel } from "../models/loginModel.js";

export async function getAllUsers(req, res, next) {
    try {
        const users = await getAllUsersModel();
        res.json(users);
    } catch (err) {
        next(err);
    }   
};

export async function postLogin(req, res, next) {
    const { username, password } = req.body;

    try {
        const login = await postLoginModel(username, password);
        res.json(login);
    } catch (err) {
        // next(err);
        res.status(401).json({ error: "Credenciais invalidas" });
    };
};

export async function patchAlterarSenha(req, res, next) {
    try {
        const changePassword = await patchAlterarSenhaModel(req.body);
        res.json(changePassword);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export async function patchInativarUsuario(req, res, next) {
    try {
        const inactivate = await patchInativarUsuarioModel(req.params.userName);
        res.json(inactivate);
    } catch (err) {
        next(err);
    }
};
