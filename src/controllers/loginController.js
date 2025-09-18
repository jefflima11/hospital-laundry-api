import { postLogin as postLoginModel, patchAlterarSenha as patchAlterarSenhaModel, patchInativarUsuario as patchInativarUsuarioModel, deleteExcluirUsuario as deleteExcluirUsuarioModel } from "../models/loginModel.js";

export async function postLogin(req, res, next) {
    const { username, password } = req.body;

    try {
        const login = await postLoginModel(username, password);
        res.json(login);
    } catch (err) {
        next(err);
    };
};

export async function patchAlterarSenha(req, res, next) {
    try {
        res.json("ainda por vir!");
    } catch (err) {
        next(err);
    }
};

export async function patchInativarUsuario(req, res, next) {
    try {
        res.json("ainda por vir!");
    } catch (err) {
        next(err);
    }
};

export async function deleteExcluirUsuario(req, res, next) {
    try {
        res.json("ainda por vir!");
    } catch (err) {
        next(err);
    }
}