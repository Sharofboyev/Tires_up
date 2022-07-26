import sql from "mssql";
import config from "../config";
import { LocalError } from "./structures";
const sqlConfig: sql.config = {
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    server: config.db_host,
    port: config.db_port,
    options: {
        encrypt: false
    }
}

export async function getTable(){
    try {
        await sql.connect(sqlConfig);
        let rows = await sql.query(
            `select 
                tiresecond.*, COALESCE(marked_table.PVI, 0) AS marked
            from 
                tiresecond 
            left join
                (select COUNT(PVI)as count, PVI from dbo.PROFILES WHERE PROFILE_NAME = 'marked' GROUP BY pvi) as marked_table ON tiresecond.PVI = marked_table.pvi`
        )
        return rows
    }
    catch (err: any){
        console.error(err.message);
        throw new LocalError(err.message, 500)
    }
}