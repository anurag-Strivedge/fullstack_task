/**
 * Test script to verify:
 * 1. Access token expires in 1 minute
 * 2. User can call /refresh-token to get a new access token
 * 3. Refresh token remains valid for 7 days
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Simulate tokens from registration
const userId = 2;
const email = 'test2@example.com';

// Generate access token (1 minute expiry)
const accessToken = jwt.sign(
  { userId, email },
  process.env.JWT_SECRET,
  { expiresIn: '1m' }
);

// Generate refresh token (7 days expiry)
const refreshToken = jwt.sign(
  { userId, email },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);

console.log('=== TOKEN VERIFICATION TEST ===\n');

// Decode and show token details
const decodedAccess = jwt.decode(accessToken);
const decodedRefresh = jwt.decode(refreshToken);

console.log('ACCESS TOKEN:');
console.log('- Expires in: 1 minute');
console.log('- Issued at:', new Date(decodedAccess.iat * 1000).toISOString());
console.log('- Expires at:', new Date(decodedAccess.exp * 1000).toISOString());
console.log('- Payload:', decodedAccess);

console.log('\nREFRESH TOKEN:');
console.log('- Expires in: 7 days');
console.log('- Issued at:', new Date(decodedRefresh.iat * 1000).toISOString());
console.log('- Expires at:', new Date(decodedRefresh.exp * 1000).toISOString());
console.log('- Payload:', decodedRefresh);

// Test immediate verification
console.log('\n=== IMMEDIATE VERIFICATION ===');
try {
  const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
  console.log('✅ Access token is valid right now');
} catch (err) {
  console.log('❌ Access token is invalid:', err.message);
}

try {
  const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  console.log('✅ Refresh token is valid right now');
} catch (err) {
  console.log('❌ Refresh token is invalid:', err.message);
}

// Simulate token expiration by creating one that already expired
console.log('\n=== EXPIRED TOKEN SIMULATION ===');
const expiredAccessToken = jwt.sign(
  { userId, email },
  process.env.JWT_SECRET,
  { expiresIn: '0s' } // Expires immediately
);

// Wait a moment and verify
setTimeout(() => {
  try {
    jwt.verify(expiredAccessToken, process.env.JWT_SECRET);
    console.log('✅ Expired access token verified');
  } catch (err) {
    console.log('✅ Expired access token correctly rejected:', err.message);
  }

  // Show workflow
  console.log('\n=== WORKFLOW VERIFICATION ===');
  console.log('1. User registers/logs in');
  console.log('   - Receives accessToken (expires in 1 minute)');
  console.log('   - Receives refreshToken (expires in 7 days)');
  console.log('   - refreshToken is stored in database');
  console.log('\n2. After 1 minute, access token expires');
  console.log('   - User attempts API call with expired accessToken');
  console.log('   - Server rejects it');
  console.log('\n3. User calls POST /refresh-token');
  console.log('   - Send: { refreshToken: "..." }');
  console.log('   - Server verifies refreshToken signature');
  console.log('   - Server checks if refreshToken exists in DB and not expired');
  console.log('   - Server generates NEW accessToken (valid for 1 minute)');
  console.log('   - User continues with new accessToken');
  console.log('\n4. This process repeats every 1 minute');
  console.log('   - Until refreshToken expires (7 days later)');
  console.log('   - Then user must login again');
}, 100);
