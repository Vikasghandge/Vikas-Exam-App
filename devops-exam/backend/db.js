// db.js placeholder
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'exam_user',
  password: process.env.DB_PASSWORD || 'exam_password',
  database: process.env.DB_NAME || 'exam_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
