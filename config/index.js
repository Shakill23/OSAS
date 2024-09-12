
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.dbName,
    user: process.env.userDb,
    password: process.env.passDb,
    multipleStatements: false,
    connectionLimit: 40
})

export {pool}
