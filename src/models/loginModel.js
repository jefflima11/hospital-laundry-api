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
            `SELECT CD_USUARIO, PASSWORD, ROLE
             FROM DBAHUMS.USERS
             WHERE CD_USUARIO = :username`,
            { username }
        );

        if (result.rows.length === 0) {
            throw new Error({ message: "Usuário não encontrado" });
        }

        const [cd_usuario, hashedPassword, role] = result.rows[0];

        const valid = await bcrypt.compare(password, hashedPassword);
        if (!valid) {
            throw new Error({ message: "Senha incorreta" });
        }

        const tokens = jwt.sign(
            { user: cd_usuario, role: role},
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        return ({ tokens, role });

    } finally {
        await conn.close();
    };
};

export async function patchAlterarSenha(req) {
    const conn = await getConnection();

    try {
        const { userName, newPassword } = req;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await conn.execute(
            `UPDATE DBAHUMS.USERS
             SET 
                PASSWORD = :hashedPassword,
                UPDATED_AT = SYSDATE
             WHERE CD_USUARIO = :userName`,
            { hashedPassword, userName }
        );

        await conn.commit();        

        return { message: "Senha alterada com sucesso" };
    } finally {
        await conn.close();
    }
};

export async function getAllUsers() {
    const conn = await getConnection();

    try {
        const result = await conn.execute(
            `SELECT 
                CD_USUARIO, 
                NM_USUARIO, 
                DECODE(ROLE, 'N', 'Normal', 'A', 'Administrador', 'L', 'Concierge') ROLE
             FROM DBAHUMS.USERS`
        );

        return result.rows;
    } finally {
        await conn.close();
    }
};

export async function patchInativarUsuario(userName) {
    const conn = await getConnection();

    try {
        await conn.execute(
            `UPDATE DBAHUMS.USERS
             SET 
                INATIVATED_AT = SYSDATE,
                UPDATED_AT = SYSDATE
             WHERE CD_USUARIO = :userName`,
            { userName },
            { autoCommit: true }
        );

        return { message: "Usuário inativado com sucesso" };
    } catch (err) {
        if (err.errorNum === 1) {
            throw new Error({ message: "Usuário não encontrado" });
        } else {
            throw err;
        }
    } finally {
        await conn.close();
    }
};