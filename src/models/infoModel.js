import { getConnection } from "../config/db.js";

export async function getInfos() {
    const conn = await getConnection();
    try {
        const result = await conn.execute(
            `Select Substr(ds_multi_empresa,6) ds_empresa From dbamv.multi_empresas Where cd_multi_empresa = 1`
        );
        return result.rows;
    } finally {
        await conn.close();
    };
};

