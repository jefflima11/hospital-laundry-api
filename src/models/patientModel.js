import { getConnection } from "../config/db.js";

export async function getPatients() {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT nm_paciente, cd_paciente
             FROM dbamv.paciente
             WHERE ROWNUM <= 5`
        );
        return result.rows;
    } finally {
        await conn.close();
    }
}