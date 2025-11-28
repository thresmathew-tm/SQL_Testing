import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

export async function getDBConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export async function runQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  const connection = await getDBConnection();
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows as T[];
}

export async function getDBConnectionForETL() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    //database: process.env.DB_NAME,
  });
}

export async function runETLQueryValidation<T = any>(query: string, params: any[] = []): Promise<T[]> {
  const connection = await getDBConnectionForETL();
  const [rows] = await connection.execute(query, params);
  await connection.end();
  return rows as T[];
}

