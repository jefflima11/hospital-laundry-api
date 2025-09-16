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
    };
};

export async function getHospitalBedsId(id) {
    const conn = await getConnection();
    try{
        let query = "";
        let binds = {};

        if(!isNaN(Number(id))) {
            query = `
                SELECT cd_leito, ds_resumo
                FROM dbamv.leito
                WHERE cd_leito = :id
            `;
            binds = { id: Number(id) };    

        } else {
            query = `
                SELECT cd_leito, ds_resumo
                FROM dbamv.leito
                WHERE ds_resumo LIKE :id
            `;
            binds = { id: `%${id}%` };
        };
        
        const result = await conn.execute(query, binds);
        return result.rows;
    } finally {
        await conn.close();
    };
};

export async function getHospitalBedsStatus() {
    const conn = await getConnection();
    
    try{
        const result = await conn.execute(
            `Select 
                ds_unid_int,
                status,
                Count(status) tt
            From
                (Select
                    ds_unid_int,
                    cd_solic_limpeza,
                    l.ds_resumo,
                    Case 
                        When dt_inicio_higieniza Is Null And dt_hr_ini_rouparia Is Null And dt_hr_ini_pos_higieniza Is Null Then 'PARA HIGIENIZACAO'
                        When dt_inicio_higieniza Is Not Null And dt_hr_ini_rouparia Is Not Null And dt_hr_ini_pos_higieniza Is Null Then 'EM HIGIENIZACAO'
                        When dt_inicio_higieniza Is Not Null And dt_hr_ini_rouparia Is Not Null And dt_hr_ini_pos_higieniza Is Not Null Then 'POS HIGIENIZACAO'
                        Else 'N/A'
                    End status
                From
                    dbamv.solic_limpeza sl
                    Inner Join dbamv.leito l On sl.cd_leito = l.cd_leito
                    Inner Join dbamv.unid_int ui On l.cd_unid_int = ui.cd_unid_int
                Where
                    sn_realizado = 'N'
                    And sn_lib_limpeza_auto = 'N'
                    And dt_cancelamento Is Null
                Order By
                    2 Desc)
            Group By 
            ds_unid_int,
            status`
        );
        return result.rows;
    } finally {
        await conn.close();
    };
};