import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConnection } from "../config/db.js";

export async function postLogin(username, password) {
    if (!username || !password) {
        throw new Error({ message: "Usuário e senha são obrigatórios" });
    }

    const conn = await getConnection();

    try {
        const result = await conn.execute(
            `SELECT CD_USUARIO, PASSWORD
             FROM DBAHUMS.USERS
             WHERE CD_USUARIO = :username`,
            { username }
        );

        if (result.rows.length === 0) {
            throw new Error({ message: "Usuário não encontrado" });
        }

        const [cd_usuario, hashedPassword] = result.rows[0];

        const valid = await bcrypt.compare(password, hashedPassword);
        if (!valid) {
            throw new Error({ message: "Senha incorreta" });
        }

        const token = jwt.sign(
            { user: cd_usuario },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return ({ token });

    } finally {
        await conn.close();
    };
};

export async function patchAlterarSenha() {

};

export async function patchInativarUsuario() {

};


export async function deleteExcluirUsuario() {

}