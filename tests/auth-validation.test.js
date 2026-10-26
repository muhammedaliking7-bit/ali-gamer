/**
 * NEXUS REALM - Authentication & Validation Test Suite
 */

const assert = require("assert");

// 1. Password Strength Calculation Logic Test
function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: "Enter Password" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  let label = "Weak";
  if (score === 2) label = "Fair";
  if (score === 3) label = "Good";
  if (score >= 4) label = "Cyber-Secure";

  return { score, label };
}

// 2. GamerTag Validation Logic Test
function validateGamerTag(tag) {
  if (!tag) return { valid: false, error: "GamerTag is required." };
  const trimmed = tag.trim();
  if (trimmed.length < 3 || trimmed.length > 24) {
    return { valid: false, error: "GamerTag must be between 3 and 24 characters." };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, error: "GamerTag can only contain alphanumeric characters and underscores." };
  }
  return { valid: true };
}

// 3. Email Validation Logic Test
function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// 4. Error Sanitization Logic Test
function sanitizeError(error) {
  if (!error) return "An unexpected transmission error occurred. Please try again.";
  const message = (error.message || error.error_description || String(error)).toLowerCase();

  if (message.includes("invalid login credentials") || message.includes("invalid_grant")) {
    return "Invalid email address or security cipher. Please check your credentials.";
  }
  if (message.includes("user already registered") || message.includes("unique constraint") || message.includes("user_already_exists")) {
    return "An operative account is already enlisted with this email address.";
  }
  if (message.includes("email not confirmed") || message.includes("email_not_confirmed")) {
    return "Account exists but comms email is not confirmed. Please check your inbox or resend verification.";
  }
  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "Security cooldown active: too many requests. Please wait a moment before trying again.";
  }
  if (message.includes("password should be at least")) {
    return "Security cipher is too short. It must be at least 8 characters.";
  }
  if (message.includes("network") || message.includes("failed to fetch")) {
    return "Network communication error. Check your connection or Supabase service status.";
  }
  return "Authentication transaction failed. Please verify your details and try again.";
}

// TEST RUNNER
console.log("\n=======================================================");
console.log("  NEXUS REALM AUTHENTICATION SUITE - AUTOMATED TESTS   ");
console.log("=======================================================\n");

let passed = 0;
let total = 0;

function test(description, fn) {
  total++;
  try {
    fn();
    console.log(`  [PASS] ${description}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${description}`);
    console.error(`         ${err.message}`);
  }
}

// --- Test Group: GamerTag Validation ---
test("GamerTag: valid tags pass", () => {
  assert.strictEqual(validateGamerTag("Valkyrie_Ghost").valid, true);
  assert.strictEqual(validateGamerTag("Neo_99").valid, true);
  assert.strictEqual(validateGamerTag("Cyber_Operative_2026").valid, true);
});

test("GamerTag: too short rejected (< 3 chars)", () => {
  assert.strictEqual(validateGamerTag("ab").valid, false);
});

test("GamerTag: too long rejected (> 24 chars)", () => {
  assert.strictEqual(validateGamerTag("SuperLongGamerTagThatExceedsLimitNow").valid, false);
});

test("GamerTag: illegal characters rejected (spaces, symbols, hyphens)", () => {
  assert.strictEqual(validateGamerTag("Cyber Ghost").valid, false);
  assert.strictEqual(validateGamerTag("User@123").valid, false);
  assert.strictEqual(validateGamerTag("Gamer#4").valid, false);
});

// --- Test Group: Email Validation ---
test("Email: valid formats pass", () => {
  assert.strictEqual(validateEmail("operative@nexusrealm.gg"), true);
  assert.strictEqual(validateEmail("alexander.vance@company.co.uk"), true);
});

test("Email: invalid formats rejected", () => {
  assert.strictEqual(validateEmail("notanemail"), false);
  assert.strictEqual(validateEmail("operative@"), false);
  assert.strictEqual(validateEmail("@nexus.com"), false);
  assert.strictEqual(validateEmail("operative@nexus"), false);
});

// --- Test Group: Password Strength ---
test("Password: empty string handled safely", () => {
  assert.strictEqual(calculatePasswordStrength("").score, 0);
});

test("Password: weak score for short password", () => {
  assert.strictEqual(calculatePasswordStrength("12345").score, 0);
});

test("Password: fair score for 8+ characters without mix", () => {
  assert.strictEqual(calculatePasswordStrength("alllowercasepass").score, 2);
});

test("Password: good score for length + case mix", () => {
  assert.strictEqual(calculatePasswordStrength("Password123456").score, 3);
});

test("Password: cyber-secure score for high entropy with symbols", () => {
  assert.strictEqual(calculatePasswordStrength("CyberShield#2026!").score >= 4, true);
});

// --- Test Group: Error Sanitization ---
test("Error Sanitizer: masks raw credential failure into user-friendly security text", () => {
  const result = sanitizeError({ message: "Invalid login credentials" });
  assert.strictEqual(result, "Invalid email address or security cipher. Please check your credentials.");
});

test("Error Sanitizer: handles duplicate user registration error gracefully", () => {
  const result = sanitizeError({ message: "User already registered" });
  assert.strictEqual(result, "An operative account is already enlisted with this email address.");
});

test("Error Sanitizer: handles unconfirmed email warning", () => {
  const result = sanitizeError({ message: "Email not confirmed" });
  assert.strictEqual(result, "Account exists but comms email is not confirmed. Please check your inbox or resend verification.");
});

test("Error Sanitizer: handles rate limiting cooldown", () => {
  const result = sanitizeError({ message: "over_email_send_rate_limit: too many requests" });
  assert.strictEqual(result, "Security cooldown active: too many requests. Please wait a moment before trying again.");
});

test("Error Sanitizer: never exposes technical stack traces or DB details", () => {
  const result = sanitizeError({ message: "pg_catalog error: relation auth.users internal query failed at 0xdeadbeef" });
  assert.strictEqual(result, "Authentication transaction failed. Please verify your details and try again.");
});

console.log(`\n=======================================================`);
console.log(`  RESULTS: ${passed} of ${total} tests passed successfully.`);
console.log(`=======================================================\n`);

if (passed !== total) {
  process.exit(1);
}
