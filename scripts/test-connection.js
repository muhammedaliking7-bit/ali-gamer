require("dotenv").config();
const { Pool } = require("pg");

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("ERROR: DATABASE_URL is not defined in environment.");
    process.exit(1);
  }

  // Parse connection URL safely without logging credentials
  const url = new URL(connectionString);
  console.log(`Connecting to Neon PostgreSQL host: ${url.hostname}, database: ${url.pathname.replace("/", "")}, user: ${url.username}`);

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log("Successfully connected to Neon PostgreSQL!");

    const res = await client.query("SELECT version(), current_database(), current_user, now() AS server_time;");
    const row = res.rows[0];
    console.log("Database:", row.current_database);
    console.log("User:", row.current_user);
    console.log("Server Time:", row.server_time);
    console.log("PostgreSQL Version:", row.version.split(" on ")[0]);

    // Check existing tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log("Existing public tables:", tablesRes.rows.map(r => r.table_name));

    client.release();
    await pool.end();
    console.log("Neon connection test PASSED.");
    process.exit(0);
  } catch (err) {
    console.error("Database connection FAILED:", err.message);
    await pool.end();
    process.exit(1);
  }
}

testConnection();
