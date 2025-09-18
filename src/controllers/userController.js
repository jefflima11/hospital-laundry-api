import bcrypt from "bcrypt";
import { getConnection } from "../config/db.js";

export async function createUser(req, res, next) {
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
        return res.status(400).json({ message: "Usuario e senha são obrigatórios" });
    }

    const conn = await getConnection();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await conn.execute(
            `INSERT INTO dbahums.USERS (CD_USUARIO, PASSWORD, NM_USUARIO, CREATED_AT)
             VALUES (:username, :password, :name, sysdate)`,
            { username, password: hashedPassword, name },
            { autoCommit: true}
        );

        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        if (err.errorNum === 1) {
            res.status(409).json({ message: "Username já existe" });
        } else {
            next(err);
        }
    } finally {
        await conn.close();
    };

};