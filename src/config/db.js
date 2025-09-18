import oracledb from "oracledb";
import dotenv from "dotenv"

dotenv.config();

let pool;

export async function initDB() {
    try {
        oracledb.initOracleClient({ libDir: process.env.DB_DIR});

        pool = await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT,
            poolMin: 1,
            poolMax: 5,
            poolIncrement: 1,
        });
        console.log("Pool OracleDB criada");
    } catch (err) {
        console.error("Erro ao criar o Pool OracleDB", err);
        process.exit(1);
    }
}

export async function closeDB() {
    try{
        if (pool) {
            await pool.close(0);
            console.log("Pool OracleDB fechado");
        }
    } catch (err) {
        console.error("Erro ao fechar o Pool OracleDB", err);
    }
}

export async function getConnection() {
    if (!pool) {
        throw new Error("Pool não inicializado. Chamar função initDB() primeiro.");
    }

    return pool.getConnection();
}