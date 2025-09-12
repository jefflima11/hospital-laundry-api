import { getConnection } from "../config/db.js";

export async function getHospitalBeds() {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT cd_leito, ds_resumo
             FROM dbamv.leito 
             WHERE dt_desativacao is null`
        );
        return result.rows;
    } finally {
        await conn.close();
    }
}