import sql from "mssql";
import config from "../config";
import { LocalError } from "./structures";

class DatabaseError extends LocalError{
    constructor(message: string){
        super(message, 500)
    }
}

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

export async function getTable(limit?: number, pvi?: number){
    try {
        const pool = await sql.connect(sqlConfig);
        try {
            let rows = await pool.request().query(
                `select ${limit ? "TOP " + String(limit): ""}
                    *
                from
                    tiresecond
                ${pvi ? "WHERE tiresecond.PVI = " + String(pvi): ""} ORDER BY CSN ASC`
            )
            return rows
        }
        catch (err: any){
            throw new DatabaseError(err.message)
        }
        finally{
            pool.close()
        }
    }
    catch (err: any){
        throw new DatabaseError(err.message)
    }
}

export async function updateMarkValue(pvi: number, marked: boolean){
    try {
        const pool = await sql.connect(sqlConfig);
        try {
            let res = await pool.request().input('PVI', sql.Int, pvi).input('profile_value', sql.VarChar, marked ? "True": "False")
                .query(`UPDATE dbo.profiles_GA SET profile_value = @profile_value WHERE profile_name = 'T2TIRE' AND PVI = @PVI;
                INSERT INTO dbo.Telegram (PVI, JOY) OUTPUT Inserted.Vaqt, 't2tire' AS Joy VALUES (@PVI, 't2tire')`)
            // let markedProfiles = await pool.request().input('PVI', sql.Int, pvi).query(`SELECT * FROM dbo.profiles WHERE profile_name = 'marked' AND PVI = @PVI`)
            // if (markedProfiles.rowsAffected[0] > 0){
            // }
            // else {
            //     await pool.request().input('PVI', sql.Int, pvi).input('profile_value', sql.VarChar, marked ? "True": "False")
            //         .query(`INSERT INTO dbo.profiles (PVI, profile_name, profile_value) VALUES (@PVI, 'marked', @profile_value)`)
            // }
            return res.recordset[0]
        }
        catch (err: any){
            throw new DatabaseError(err.message)
        }
        finally{
            pool.close()
        }
    }
    catch (err: any){
        throw new DatabaseError(err.message)
    }
}

export async function getMarkTimes(pvi: number) {
    try {
        const pool = await sql.connect(sqlConfig);
        try {
            let rows = await pool.request().input('PVI', sql.Int, pvi).query(
                `SELECT Vaqt, Joy FROM dbo.Telegram WHERE Joy IN ('tushdi', 't2tire') AND PVI=@PVI ORDER BY ID ASC`)
            return rows.recordset
        }
        catch (err: any){
            throw new DatabaseError(err.message)
        }
        finally{
            pool.close()
        }
    }
    catch (err: any){
        throw new DatabaseError(err.message)
    }
}