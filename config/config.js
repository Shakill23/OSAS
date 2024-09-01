import { config } from "dotenv";
config();
import mysql from "mysql2";


const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.dbName,
    user: process.env.userDb,
    password: process.env.passwDb,
    multipleStatements: false,
    connectionLimit: 30
}).promise()

export { pool };