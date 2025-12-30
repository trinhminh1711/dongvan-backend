const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"dongvan_data",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4"
});
module.exports = pool;