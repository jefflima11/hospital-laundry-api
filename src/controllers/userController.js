import bcrypt from "bcrypt";
import { getConnection } from "../config/db.js";

export async function createUser(req, res, next) {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name || !role) {
        return res.status(400).json({ message: "Usuario e senha são obrigatórios" });
    }

    const conn = await getConnection();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // await conn.execute(
        //     `INSERT INTO dbahums.USERS (CD_USUARIO, PASSWORD, NM_USUARIO, CREATED_AT, ROLE)
        //      VALUES (:username, :password, :name, sysdate, :role)`,
        //     { username, password: hashedPassword, name, role },
        //     { autoCommit: true}
        // );

        // res.status(201).json({ message: "Usuário criado com sucesso" });

        res.status(201).json({ username, hashedPassword, name, role });
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