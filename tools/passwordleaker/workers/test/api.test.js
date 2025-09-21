
#!/usr/bin/env node

/**
 * Simple API Test Suite for Password Leaker PRO
 * Run with: node test/api.test.js
 */

const API_BASE = process.env.API_BASE || 'http://localhost:8787';

async function testAPI() {
  console.log('🧪 Testing Password Leaker PRO API\n');
  
  let authToken = null;
  
  // Test 1: Health Check
  console.log('1. Testing health endpoint...');
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'healthy') {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }
  
  // Test 2: Authentication
  console.log('\n2. Testing authentication...');
  try {
    const response = await fetch(`${API_BASE}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      console.log('✅ Authentication passed');
      authToken = data.token;
    } else {
      console.log('❌ Authentication failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Authentication error:', error.message);
  }
  
  // Test 3: User Profile (requires auth)
  if (authToken) {
    console.log('\n3. Testing user profile...');
    try {
      const response = await fetch(`${API_BASE}/api/user`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      const data = await response.json();
      
      if (response.ok && data.email) {
        console.log('✅ User profile passed');
      } else {
        console.log('❌ User profile failed:', data.error);
      }
    } catch (error) {
      console.log('❌ User profile error:', error.message);
    }
  }
  
  // Test 4: Password Check (requires auth)
  if (authToken) {
    console.log('\n4. Testing password check...');
    try {
      // SHA-1 of "password" - known to be breached
      const testHash = '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8';
      
      const response = await fetch(`${API_BASE}/api/check?hash=${testHash}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      const data = await response.json();
      
      if (response.ok && typeof data.isBreached === 'boolean') {
        console.log('✅ Password check passed');
        console.log(`   Password "password" is breached: ${data.isBreached}`);
        console.log(`   Breach count: ${data.breachCount}`);
        console.log(`   Risk level: ${data.riskLevel}`);
      } else {
        console.log('❌ Password check failed:', data.error);
      }
    } catch (error) {
      console.log('❌ Password check error:', error.message);
    }
  }
  
  // Test 5: Rate Limiting
  if (authToken) {
    console.log('\n5. Testing rate limiting...');
    try {
      // Make multiple requests to test rate limiting
      for (let i = 0; i < 3; i++) {
        const testHash = '5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8';
        const response = await fetch(`${API_BASE}/api/check?hash=${testHash}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          console.log(`   Request ${i + 1}: Remaining checks: ${data.remainingChecks}`);
        } else if (response.status === 429) {
          console.log(`   Request ${i + 1}: Rate limited (expected for free users)`);
          break;
        }
      }
      console.log('✅ Rate limiting test completed');
    } catch (error) {
      console.log('❌ Rate limiting error:', error.message);
    }
  }
  
  console.log('\n🎯 API Testing Complete!');
  
  if (!authToken) {
    console.log('\n⚠️  Some tests skipped due to authentication failure');
    console.log('Make sure your API is running and database is connected');
  }
}

testAPI().catch(console.error);
