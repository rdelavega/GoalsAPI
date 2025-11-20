import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // necesario para Neon
  forceIPv4: true,
});

export function createQuery(pool) {
  return (text, params) => pool.query(text, params);
}

export const query = createQuery(pool);
export default pool;
