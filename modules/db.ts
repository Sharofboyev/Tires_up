import sql from "mssql";
import config from "../config";
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

try {
 // make sure that any items are correctly URL encoded in the connection string
 sql.connect(sqlConfig)
 const result = sql.query`select COUNT(*) AS count FROM dbo.profiles`
 console.dir(result)
} catch (err: any) {
  console.log(err.message)
 // ... error checks
}