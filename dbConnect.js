// dbConnect.js  (replace existing connect code with this safe pattern)
const mysql = require('mysql2/promise'); // uses mysql2 promise API
const util = require('util');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

let pool;

async function createPool() {
  try {
    pool = mysql.createPool({
      host: DB_HOST || '127.0.0.1',
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DB_DATABASE || 'impact',
      port: DB_PORT ? Number(DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    // Test connection
    await pool.query('SELECT 1');
    console.log('MySQL pool created and test query succeeded');
  } catch (err) {
    console.error('MySQL initial connection failed:', err.message || err);
    // don't throw — schedule retry
    setTimeout(createPool, 5000); // retry after 5 seconds
  }
}

function getPool() {
  if (!pool) {
    throw new Error('MySQL pool not initialized yet');
  }
  return pool;
}

createPool(); // start attempt immediately

module.exports = {
  getPool,
  createPool,
};
