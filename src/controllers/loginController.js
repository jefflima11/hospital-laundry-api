import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConnection } from "../config/db.js";

export async function login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const conn = await getConnection();

    try {
        // Busca no banco pelo CD_USUARIO
        const result = await conn.execute(
            `SELECT CD_USUARIO, PASSWORD
             FROM DBAHUMS.USERS
             WHERE CD_USUARIO = :username`,
            { username }
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        // Oracle retorna um array, ex: [ "joao", "hashAqui" ]
        const [cd_usuario, hashedPassword] = result.rows[0];

        // Verifica senha com bcrypt
        const valid = await bcrypt.compare(password, hashedPassword);
        if (!valid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { user: cd_usuario },  // payload simples
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });

    } catch (err) {
        next(err);
    } finally {
        await conn.close();
    }
}
