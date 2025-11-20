import app from "./app.js";
import pool from "./db/index.js";

process.env.PGHOSTADDR = "0.0.0.0";

const port = 4001;
async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected.");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }

  app.listen(port, () =>
    console.log("Server running on http://localhost:4000")
  );
}

startServer();
