import pkg from "pg";

const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to the database...");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const res = await pool.query("SELECT NOW()");
console.log(res.rows[0]);

export const query = (text, params) => pool.query(text, params);
export default pool;
