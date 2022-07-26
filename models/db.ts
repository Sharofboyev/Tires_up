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

export async function getTable(){
    try {
        const pool = await sql.connect(sqlConfig);
        try {
            let rows = await pool.request().query(
                `select TOP 10 
                    tiresecond.*, COALESCE(marked_table.PVI, 0) AS marked
                from 
                    tiresecond 
                left join
                    (select COUNT(PVI)as count, PVI from dbo.PROFILES WHERE PROFILE_NAME = 'marked' GROUP BY pvi) as marked_table ON tiresecond.PVI = marked_table.pvi`
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
            let markedProfiles = await pool.request().input('PVI', sql.Int, pvi).query(`SELECT * FROM dbo.profiles WHERE profile_name = "marked" AND PVI = @PVI`)
            if (markedProfiles.rowsAffected[0] > 0){
                await pool.request().input('PVI', sql.Int, pvi).input('profile_value', sql.VarChar, marked ? "True": "False")
                    .query(`UPDATE dbo.profiles SET profile_value = @profile_value WHERE profile_name = "marked" AND PVI = @PVI`)
            }
            else {
                await pool.request().input('PVI', sql.Int, pvi).input('profile_value', sql.VarChar, marked ? "True": "False")
                    .query(`INSERT INTO dbo.profiles (PVI, profile_name, profile_value) VALUES (@PVI, "marked", @profile_value)`)
            }
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