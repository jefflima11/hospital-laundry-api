import { getConnection } from "../config/db.js";

export async function getInfos() {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `SELECT ds_multi_empresa from dbamv.multi_empresas order by 1`
        );
        return result.rows;
    } finally {
        await conn.close();
    }
}