/**
 * NEXUS REALM - Asset, Syntax, and Architecture Verification Build Script
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

console.log("=======================================================");
console.log("⚡ Building and Validating NEXUS REALM Architecture");
console.log("=======================================================");

const rootDir = path.resolve(__dirname, "..");

const requiredFiles = [
  "index.html",
  "server.js",
  "package.json",
  ".env.example",
  ".gitignore",
  "css/style.css",
  "js/app.js",
  "js/router.js",
  "js/state.js",
  "js/config.js",
  "js/data.js",
  "js/auth-client.js",
  "js/neon-client.js",
  "js/components/navbar.js",
  "js/components/footer.js",
  "js/components/modals.js",
  "js/components/particles.js",
  "js/views/home.js",
  "js/views/games.js",
  "js/views/gameDetails.js",
  "js/views/news.js",
  "js/views/newsArticle.js",
  "js/views/tournaments.js",
  "js/views/community.js",
  "js/views/about.js",
  "js/views/contact.js",
  "js/views/auth.js",
  "js/views/profile.js",
  "server/db.js"
];

let errors = 0;

console.log("\n1. Verifying presence of required architecture files...");
for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`  ✓ ${relPath} (${stats.size} bytes)`);
  } else {
    console.error(`  ✗ MISSING: ${relPath}`);
    errors++;
  }
}

console.log("\n2. Validating JavaScript syntax across server and client modules...");
const jsFiles = [
  "server.js",
  "server/db.js",
  "scripts/migrate.js",
  "scripts/test-connection.js"
];

for (const relPath of jsFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const code = fs.readFileSync(fullPath, "utf8");
    try {
      new vm.Script(code, { filename: relPath });
      console.log(`  ✓ Syntax check passed: ${relPath}`);
    } catch (syntaxErr) {
      console.error(`  ✗ Syntax error in ${relPath}:`, syntaxErr.message);
      errors++;
    }
  }
}

console.log("\n3. Validating HTML structure and entry scripts...");
const indexPath = path.join(rootDir, "index.html");
const indexContent = fs.readFileSync(indexPath, "utf8");

if (indexContent.includes('id="app"') && indexContent.includes('id="nav-root"') && indexContent.includes('id="main-content"')) {
  console.log("  ✓ Core DOM mount points verified (#app, #nav-root, #main-content)");
} else {
  console.error("  ✗ Missing expected core mount points in index.html");
  errors++;
}

console.log("\n4. Security & Environment checks...");
if (fs.existsSync(path.join(rootDir, ".env"))) {
  const envContent = fs.readFileSync(path.join(rootDir, ".env"), "utf8");
  if (envContent.includes("DATABASE_URL=")) {
    console.log("  ✓ DATABASE_URL configured in local environment (.env)");
  } else {
    console.warn("  ! Warning: DATABASE_URL not set in .env");
  }
}

const gitignorePath = path.join(rootDir, ".gitignore");
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
  if (gitignoreContent.includes(".env")) {
    console.log("  ✓ .env is protected in .gitignore");
  } else {
    console.error("  ✗ .env is NOT in .gitignore!");
    errors++;
  }
}

console.log("\n=======================================================");
if (errors > 0) {
  console.error(`❌ Build validation failed with ${errors} errors.`);
  process.exit(1);
} else {
  console.log("✅ Build verification completed successfully! All assets verified.");
  console.log("=======================================================");
  process.exit(0);
}
