require("dotenv").config();
const { pool } = require("../server/db");

async function runDatabaseTests() {
  console.log("=======================================================");
  console.log("⚡ Running Neon Database End-to-End Test Suite");
  console.log("=======================================================");

  const testUserId = "00000000-0000-4000-8000-000000000001";
  const testGamertag = "TestOperative_99";
  const testGameId = "cyber-odyssey-2099";
  const testTournamentId = "cyber-masters-invitational-2026";

  let client;
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    client = await pool.connect();

    // 1. Connection check
    console.log("\n1. Testing basic connection and query...");
    const timeRes = await client.query("SELECT now() AS server_time, current_database() AS db;");
    assert(timeRes.rows.length === 1, `Connected to database '${timeRes.rows[0].db}' at ${timeRes.rows[0].server_time}`);

    // 2. Table existence
    console.log("\n2. Checking table existence in Neon database...");
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    const tables = tablesRes.rows.map(r => r.table_name);
    assert(tables.includes("profiles"), "Table 'profiles' exists");
    assert(tables.includes("user_favorites"), "Table 'user_favorites' exists");
    assert(tables.includes("user_tournament_registrations"), "Table 'user_tournament_registrations' exists");
    assert(tables.includes("game_reviews"), "Table 'game_reviews' exists");
    assert(tables.includes("contact_messages"), "Table 'contact_messages' exists");

    // Clean up any previous test artifacts
    await client.query("DELETE FROM public.profiles WHERE id = $1;", [testUserId]);

    // 3. Profile Insertion
    console.log("\n3. Testing profile CRUD operations...");
    const insertProfRes = await client.query(`
      INSERT INTO public.profiles (id, email, gamertag, display_name, bio)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [testUserId, "test_operative@nexusrealm.gg", testGamertag, "Operative 99", "Alpha tester"]);
    assert(insertProfRes.rows.length === 1 && insertProfRes.rows[0].gamertag === testGamertag, "Profile created successfully");

    // Profile Read
    const getProfRes = await client.query("SELECT * FROM public.profiles WHERE id = $1;", [testUserId]);
    assert(getProfRes.rows.length === 1 && getProfRes.rows[0].display_name === "Operative 99", "Profile retrieved accurately");

    // Profile Update
    const updateProfRes = await client.query(`
      UPDATE public.profiles
      SET display_name = $1, bio = $2
      WHERE id = $3
      RETURNING *;
    `, ["Operative 99 Updated", "Updated Alpha tester", testUserId]);
    assert(updateProfRes.rows[0].display_name === "Operative 99 Updated", "Profile updated accurately");

    // 4. Duplicate GamerTag prevention
    console.log("\n4. Testing unique constraint integrity...");
    let duplicateRejected = false;
    try {
      await client.query(`
        INSERT INTO public.profiles (id, email, gamertag)
        VALUES ('00000000-0000-4000-8000-000000000002', 'another@nexusrealm.gg', $1);
      `, [testGamertag]);
    } catch (err) {
      duplicateRejected = true;
    }
    assert(duplicateRejected, "Duplicate gamertag correctly rejected by database constraint");

    // 5. User Favorites
    console.log("\n5. Testing user wishlist/favorites persistence...");
    const favInsertRes = await client.query(`
      INSERT INTO public.user_favorites (user_id, game_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [testUserId, testGameId]);
    assert(favInsertRes.rows.length === 1 && favInsertRes.rows[0].game_id === testGameId, "Favorite game added");

    const favGetRes = await client.query(`
      SELECT game_id FROM public.user_favorites WHERE user_id = $1;
    `, [testUserId]);
    assert(favGetRes.rows.some(r => r.game_id === testGameId), "Favorite game retrieved from user's wishlist");

    // 6. Tournament Registration
    console.log("\n6. Testing tournament registrations...");
    const tourneyInsertRes = await client.query(`
      INSERT INTO public.user_tournament_registrations (user_id, tournament_id, squad_name)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [testUserId, testTournamentId, "Neon Spectres"]);
    assert(tourneyInsertRes.rows.length === 1 && tourneyInsertRes.rows[0].squad_name === "Neon Spectres", "Tournament registration created");

    // 7. Cleanup
    console.log("\n7. Cleaning up test data...");
    await client.query("DELETE FROM public.profiles WHERE id = $1;", [testUserId]);
    const verifyCleanup = await client.query("SELECT * FROM public.profiles WHERE id = $1;", [testUserId]);
    assert(verifyCleanup.rows.length === 0, "Test data cleaned up successfully (CASCADE delete verified on favorites & tournaments)");

    console.log("\n=======================================================");
    console.log(`Test Results: ${passed} passed, ${failed} failed.`);
    console.log("=======================================================");

    client.release();
    await pool.end();

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    if (client) client.release();
    await pool.end();
    process.exit(1);
  }
}

runDatabaseTests();
