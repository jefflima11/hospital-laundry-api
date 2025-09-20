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

export async function getEmployee() {
    const conn = await getConnection();

    try {
        const result =  await conn.execute(`
            SELECT
                f.CD_FUNC,
                f.NM_FUNC
            FROM
                dbamv.funcionario f
                inner join dbamv.func_espec fe on f.cd_func = fe.cd_func
            WHERE
                sn_ativo = 'S'
                and fe.cd_espec = 40`
        );

        return result.rows;
    } finally {
        await conn.close();
    }
}
