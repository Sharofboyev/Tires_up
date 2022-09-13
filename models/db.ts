import e from "express";
import sql from "mssql";
import config from "../config";
import { LocalError } from "./structures";

class DatabaseError extends LocalError {
  constructor(message: string) {
    super(message, 500);
  }
}

const sqlConfig: sql.config = {
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
  server: config.db_host,
  port: config.db_port,
  options: {
    encrypt: false,
  },
};

export async function getTable(query: string, limit?: number, pvi?: number) {
  const pool = await sql.connect(sqlConfig);
  try {
    let rows = await pool
      .request()
      .query(
        `SELECT ${limit ? `TOP ${limit} ` : ""} * from (${query}) AS my_view ${
          pvi ? `WHERE PVI = ${pvi} ` : ""
        } ORDER BY CSN ASC`
      );
    return rows;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function updateMarkValue(
  pvi: number,
  marked: boolean,
  viewName: string
) {
  const pool = await sql.connect(sqlConfig);
  try {
    let res = await pool
      .request()
      .input("view_name", sql.VarChar, viewName)
      .input("PVI", sql.Int, pvi)
      .input("profile_value", sql.VarChar, marked ? "True" : "False")
      .query(`UPDATE dbo.profiles_GA SET profile_value = @profile_value WHERE profile_name = @view_name AND PVI = @PVI;
              INSERT INTO dbo.Telegram (PVI, JOY) OUTPUT Inserted.Vaqt, @view_name AS Joy VALUES (@PVI, @view_name)`);
    return res.recordset[0];
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function getMarkTimes(pvi: number, viewName: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    let rows = await pool
      .request()
      .input("PVI", sql.Int, pvi)
      .input("view_name", sql.VarChar, viewName)
      .query(
        `SELECT Vaqt, Joy FROM dbo.Telegram WHERE Joy IN ('tushdi', @view_name) AND PVI=@PVI ORDER BY ID ASC`
      );
    return rows.recordset;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function hasThisView(name: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    let rows = await pool
      .request()
      .input("name", sql.VarChar(32), name)
      .query(`SELECT COUNT(*) AS total FROM views WHERE name = @name`);
    if (rows.recordset.length > 0) {
      return rows.recordset[0].total > 0;
    }
    return false;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function getViews(name?: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    let rows;
    if (name) {
      rows = await pool
        .request()
        .input("name", sql.VarChar(32), name)
        .query("SELECT * FROM views WHERE name = @name ORDER BY ID ASC");
      if (rows.recordset.length > 0) return rows.recordset[0];
      else return null;
    } else
      rows = await pool.request().query("SELECT * FROM views ORDER BY ID ASC");
    return rows.recordset;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function updateView(name: string, query: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    const { recordset } = await pool
      .request()
      .input("name", sql.VarChar(32), name)
      .input("query", sql.VarChar(), query)
      .query(
        `UPDATE views SET query = @query, created_time = GETDATE() WHERE name = @name; SELECT created_time FROM views WHERE name = @name`
      );
    if (recordset.length > 0) return recordset[0];
    else return { created_time: new Date() };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function removeView(name: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    await pool
      .request()
      .input("name", sql.VarChar(32), name)
      .query(`DELETE FROM views WHERE name = @name`);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}

export async function addView(name: string, query: string) {
  const pool = await sql.connect(sqlConfig);
  try {
    const { recordset } = await pool
      .request()
      .input("name", sql.VarChar(), name)
      .input("query", sql.VarChar(), query)
      .query(
        `INSERT INTO views (query, name) VALUES (@query, @name); SELECT * FROM views WHERE name = @name`
      );
    if (recordset.length > 0) return recordset[0];
    else throw new Error("View hasn't been added successfully");
  } catch (err: any) {
    throw new DatabaseError(err.message);
  } finally {
    pool.close();
  }
}
