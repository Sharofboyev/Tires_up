import sql from "mssql";
import config from "../config";
const sqlConfig: sql.config = {
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    server: config.db_host,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
}

async () => {
    try {
     // make sure that any items are correctly URL encoded in the connection string
     await sql.connect(sqlConfig)
     const result = await sql.query`select 45`
     console.dir(result)
    } catch (err) {
     // ... error checks
    }
}