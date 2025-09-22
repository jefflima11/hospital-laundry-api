import { getConnection } from "../config/db.js";
import oracledb from "oracledb";

export async function getHospitalBeds() {
    const conn = await getConnection();

    try {
        const result = await conn.execute(`
            SELECT 
                ui.ds_unid_int,
                Case
                    When Substr(l.ds_leito,1,3) = 'APT' then 'APARTAMENTO '||Substr(l.ds_leito,4)
                    When Substr(l.ds_leito,1,3) = 'ENF' Then 'ENFERMARIA '||Substr(Substr(l.ds_leito,4),1,3)||' - '||Substr(l.ds_leito,7)
                    When Substr(l.ds_leito,1,3) = 'UTI' Then 'U.T.I - LEITO '||Substr(l.ds_leito,5,2)
                    Else ds_leito
                End ds_leito,
                Decode(l.tp_ocupacao,'O','OCUPADO'
                                    ,'V','VAGO'
                                    ,'N','INTERDICAO'
                                    ,'T','INTERDITADO TEMPORARIAMENTE'
                                    ,'R','OCUPADO POR RESERVA'
                                    ,'L','EM LIMPEZA'
                                    ,'I','OCUPADO POR INFECCAO'
                                    ,'E','REFORMA'
                                    ,'M','MANUTENCAO'
                                    ,'C','INTERDITADO POR INFECCAO'
                                    ,'A','ACOMPANHANTE'
                                    ,l.tp_ocupacao
                ) tp_ocupacao
            FROM 
                dbamv.leito l
                inner join dbamv.unid_int ui on l.cd_unid_int = ui.cd_unid_int
            WHERE 
                l.dt_desativacao is null
                and l.cd_tip_acom in (1,2,8)
                and l.sn_extra = 'N'`
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

export async function getCleaningHospitalBeds(post) {
    const conn = await getConnection();

    try {
        const result = await conn.execute(`
            Select
                cd_solic_limpeza,
                Case
                    When Substr(l.ds_leito,1,3) = 'APT' then 'APARTAMENTO '||Substr(l.ds_leito,4)
                    When Substr(l.ds_leito,1,3) = 'ENF' Then 'ENFERMARIA '||Substr(Substr(l.ds_leito,4),1,3)||' - '||Substr(l.ds_leito,7)
                    When Substr(l.ds_leito,1,3) = 'UTI' Then 'U.T.I - LEITO '||Substr(l.ds_leito,5,2)
                    Else
                    ds_leito
                End ds_leito,
                dt_solic_limpeza
            From
                dbamv.solic_limpeza sl
                Inner Join dbamv.leito l On sl.cd_leito = l.cd_leito
                Inner Join dbamv.unid_int ui On l.cd_unid_int = ui.cd_unid_int
            Where
                sn_realizado = 'N'
                And sn_lib_limpeza_auto = 'N'
                And dt_cancelamento Is Null
                And ui.cd_unid_int = :post
            Order By
                2 Desc`,
            { post }
        ); 
        
        return result.rows;
    } finally{
        await conn.close();
    };
};

export async function patchCleaningRequest(request) {
    const conn = await getConnection();

    try {
        const result = await conn.execute(`
            Select 
                dt_inicio_higieniza,
                dt_hr_ini_rouparia,
                dt_hr_ini_pos_higieniza
            From
                dbamv.solic_limpeza
            where
                cd_solic_limpeza = :request`, 
            { request },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows[0]["DT_INICIO_HIGIENIZA"] === null) {
            await conn.execute(`
                UPDATE dbamv.solic_limpeza
                SET DT_INICIO_HIGIENIZA = sysdate,
                    HR_INICIO_HIGIENIZA = sysdate,
                    DT_HR_FIM_AG_HIGIENIZA = sysdate,
                    DT_HR_INI_ROUPARIA = sysdate,
                    DT_HR_FIM_ROUPARIA = sysdate
                WHERE
                    cd_solic_limpeza = :request`, 
                { request },
                { autoCommit: true}
            );

            return "Solicitação alterada para EM HIGIENIZAÇÂO"
        } else if (result.rows[0]["DT_HR_INI_ROUPARIA"] === null) {
            //   Ainda não usado sistema de rouparia
        } else if (result.rows[0]["DT_HR_INI_POS_HIGIENIZA"] === null) {
            await conn.execute(`
                UPDATE dbamv.solic_limpeza
                SET DT_HR_FIM_HIGIENIZA = sysdate,
                    DT_HR_INI_POS_HIGIENIZA = sysdate
                WHERE
                    cd_solic_limpeza = :request`,
                { request },
                { autoCommit: true}
            );

            return "Solicitação alterada para POS-HIGIENIZACAO";
        } else {
            return "Solicitação já se encontra em POS-HIGIENIZACAO para confirmação."
        }

    } finally {
        await conn.close;
    };
};

export async function getCleaningRequest() {
    const conn = await getConnection();

    try {
        const result = await conn.execute(`
            Select
                ds_unid_int,
                Case 
                    When dt_inicio_higieniza Is Null And dt_hr_ini_rouparia Is Null And dt_hr_ini_pos_higieniza Is Null Then 'PARA HIGIENIZACAO'
                    When dt_inicio_higieniza Is Not Null And dt_hr_ini_rouparia Is Not Null And dt_hr_ini_pos_higieniza Is Null Then 'EM HIGIENIZACAO'
                    When dt_inicio_higieniza Is Not Null And dt_hr_ini_rouparia Is Not Null And dt_hr_ini_pos_higieniza Is Not Null Then 'POS HIGIENIZACAO'
                    Else 'N/A'
                End status,
                Case
                    When Substr(l.ds_leito,1,3) = 'APT' then 'APARTAMENTO '||Substr(l.ds_leito,4)
                    When Substr(l.ds_leito,1,3) = 'ENF' Then 'ENFERMARIA '||Substr(Substr(l.ds_leito,4),1,3)||' - '||Substr(l.ds_leito,7)
                    When Substr(l.ds_leito,1,3) = 'UTI' Then 'U.T.I - LEITO '||Substr(l.ds_leito,5,2)
                    Else
                    ds_leito
                End ds_leito,
                cd_solic_limpeza,                
                dt_solic_limpeza,
                p.nm_paciente
                
            From
                dbamv.solic_limpeza sl
                Inner Join dbamv.leito l On sl.cd_leito = l.cd_leito
                Inner Join dbamv.unid_int ui On l.cd_unid_int = ui.cd_unid_int
                Inner join dbamv.atendime a on sl.cd_atendimento = a.cd_atendimento
                Inner join dbamv.paciente p on a.cd_paciente = p.cd_paciente
            Where
                sn_realizado = 'N'
                And sn_lib_limpeza_auto = 'N'
                And dt_cancelamento Is Null
                And dt_hr_ini_pos_higieniza Is Null
            Order By
                2 Desc      
        `);

        return result.rows;
    } finally {
        await conn.close();
    }
};

export async function confirmCleaningRequest(request, binds) {
    const {employee, observation} = binds
    
    if (!request || !employee) {
        return `Solicitação e funcionario são obrigatórios`;
    };
    
    const conn = await getConnection();

    try {

        const checkRequest = await conn.execute(`
            SELECT sn_realizado FROM dbamv.solic_limpeza WHERE cd_solic_limpeza = :request`,
            { request }
        );

        if (checkRequest.rows == 'S') {
            return "Solicitação já confirmada!";

        } else {
            const checkEmployee = await conn.execute(`
                SELECT 1
                FROM
                    dbamv.funcionario f
                    Inner join dbamv.func_espec fe on f.cd_func = fe.cd_func
                WHERE
                    f.cd_func = :employee
                    and fe.cd_espec = 40`,
                { employee }
            );
    
            if (checkEmployee.rows > 0) {
    
                 await conn.execute(`
                UPDATE dbamv.solic_limpeza
                SET DT_REALIZADO = sysdate,
                    HR_REALIZADO = sysdate,
                    DT_HR_FIM_POS_HIGIENIZA = sysdate,
                    SN_REALIZADO = 'S',
                    CD_FUNC = :employee,
                    DS_OBSERVACAO = :observation
                WHERE
                    cd_solic_limpeza = :request
                    `,
                { request, employee, observation },
                { autoCommit: true}    
            );
    
                return `Confirmação de limpeza realizada`
            } else {
                return `Funcionario informado não autorizado para higienização!`;
            }
            
        }

    } finally {
        await conn.close();
    };

};

export async function refuseCleaningRequest(request) {
    const conn = await getConnection();

    try {

        const verifyRequest = await conn.execute(`
            SELECT
                DT_HR_INI_POS_HIGIENIZA
            FROM
                dbamv.solic_limpeza
            WHERE
                cd_solic_limpeza = :request`,
            { request }
        );


        if (verifyRequest.rows[0][0] === null) {
            return ('Solicitação não se encontra em POS-HIGIENIZACAO para confirmação');
        } else {
            await conn.execute(`
                UPDATE dbamv.solic_limpeza
                SET DT_INICIO_HIGIENIZA = null,
                    HR_INICIO_HIGIENIZA = null,
                    DT_HR_FIM_AG_HIGIENIZA = null,
                    DT_HR_INI_ROUPARIA = null,
                    DT_HR_FIM_ROUPARIA = null,
                    DT_HR_FIM_HIGIENIZA = null,
                    DT_HR_INI_POS_HIGIENIZA = NULL,
                    DS_OBSERVACAO = '**REPROVADA NO PÓS LIMPEZA***DATA/HORA'||' '||to_char(sysdate,'dd/mm/yyyy HH24:MI')||' '||'USUÁRIO: '||USER
                WHERE
                    cd_solic_limpeza = :request`,
                { request },
                { autoCommit: true}
            );
            return "Solicitação recusada!";
        }


    } finally {
        await conn.close();
    }
};