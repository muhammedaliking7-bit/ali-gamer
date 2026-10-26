require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("[Database] WARNING: DATABASE_URL is not set. Database operations will fail until configured.");
}

// Create connection pool with SSL enabled for Neon PostgreSQL
const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on("error", (err) => {
  console.error("[Database] Unexpected pool error on idle client:", err.message);
});

/**
 * Execute parameterized query with automatic error wrapping
 */
async function query(text, params = []) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      console.log(`[Database] Query executed in ${duration}ms: ${text.slice(0, 80).replace(/\s+/g, " ")}`);
    }
    return res;
  } catch (err) {
    console.error("[Database] Query error:", err.message);
    throw err;
  }
}

/**
 * Check database health
 */
async function healthCheck() {
  if (!connectionString) {
    return { status: "disconnected", error: "DATABASE_URL not configured" };
  }
  try {
    const start = Date.now();
    const res = await pool.query("SELECT version(), current_database() as db, current_user as usr, now() as time;");
    const latencyMs = Date.now() - start;
    return {
      status: "connected",
      database: res.rows[0].db,
      user: res.rows[0].usr,
      serverTime: res.rows[0].time,
      version: res.rows[0].version.split(" on ")[0],
      latencyMs
    };
  } catch (err) {
    return {
      status: "error",
      error: err.message
    };
  }
}

/**
 * Execute a transaction with automatic rollback
 */
async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query,
  healthCheck,
  transaction
};
