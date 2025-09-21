import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon, neonConfig } from '@neondatabase/serverless';
import { sign, verify } from 'hono/jwt';
import crypto from 'crypto';

// Verify Coinbase webhook signature
async function verifyCoinbaseWebhook(request) {
  const signature = request.headers.get('X-CC-Webhook-Signature') || '';
  const body = await request.text();

  const hmac = crypto
    .createHmac('sha256', COINBASE_COMMERCE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (hmac !== signature) {
    throw new Error('Invalid Coinbase signature');
  }

  return JSON.parse(body);
}
async function handleCoinbaseWebhook(request) {
  try {
    const event = await verifyCoinbaseWebhook(request);

    // Only activate PRO if payment is confirmed
    if (event.type === 'charge:confirmed') {
      const email = event.data.customer.email;

      // Call your DB function to activate PRO
      await db.updateUserPro(email, true); // your existing DB update function

      return new Response('PRO activated', { status: 200 });
    }

    return new Response('Event ignored', { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}

// Configure Neon for optimal serverless performance


const app = new Hono();

// CORS configuration for production
app.use('*', cors({
  origin: ['https://passwordleaker.denti.systems', 'https://password-leaker-pro.vercel.app', 'http://localhost:5173', 'https://9b7c1de2-e58e-40e3-8c2a-704e6fe2d5a1.sandbox.lovable.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Database connection helper
function getDb(env) {
  if (!env.NEON_DB_URL) {
    throw new Error('NEON_DB_URL environment variable is required');
  }
  return neon(env.NEON_DB_URL);
}

// JWT token helpers
async function createToken(payload, env) {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return await sign({ ...payload, exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) }, env.JWT_SECRET);
}

async function verifyToken(token, env) {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return await verify(token, env.JWT_SECRET);
}

// Authentication middleware
async function authenticate(c, next) {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    const token = authHeader.slice(7);
    const payload = await verifyToken(token, c.env);
    c.set('user', payload);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}

// Rate limiting helper
async function checkRateLimit(c, userId) {
  const sql = getDb(c.env);
  const today = new Date().toISOString().split('T')[0];
  
  const userResult = await sql`
    SELECT tier, daily_checks_used, last_check_date 
    FROM users 
    WHERE id = ${userId}
  `;
  
  if (userResult.length === 0) {
    throw new Error('User not found');
  }
  
  const user = userResult[0];
  
  if (user.tier === 'pro') {
    return { allowed: true, remaining: 'unlimited' };
  }
  
  let checksUsed = user.daily_checks_used || 0;
  if (user.last_check_date !== today) {
    checksUsed = 0;
    await sql`
      UPDATE users 
      SET daily_checks_used = 0, last_check_date = ${today}
      WHERE id = ${userId}
    `;
  }
  
  if (checksUsed >= 5) {
    return { 
      allowed: false, 
      remaining: 0,
      resetTime: new Date(today + 'T00:00:00Z').getTime() + 24 * 60 * 60 * 1000
    };
  }
  
  return { allowed: true, remaining: 5 - checksUsed };
}

// Update rate limit counter
async function updateRateLimit(c, userId) {
  const sql = getDb(c.env);
  const today = new Date().toISOString().split('T')[0];
  
  await sql`
    UPDATE users 
    SET daily_checks_used = COALESCE(daily_checks_used, 0) + 1,
        last_check_date = ${today},
        last_active = NOW()
    WHERE id = ${userId}
  `;
}

// Password breach checking with k-anonymity
async function checkPasswordBreach(passwordHash) {
  try {
    const prefix = passwordHash.substring(0, 5);
    const suffix = passwordHash.substring(5);
    
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'PasswordLeaker-DentiSystems-API/1.0'
      }
    });
    

    if (!response.ok) {
      throw new Error('HIBP API unavailable');
    }
    
    const data = await response.text();
    const lines = data.split('\n');
    
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix.trim().toUpperCase() === suffix.toUpperCase()) {
        const breachCount = parseInt(count.trim(), 10);
        return {
          isBreached: true,
          breachCount,
          riskLevel: getRiskLevel(breachCount)
        };
      }
    }
    
    return {
      isBreached: false,
      breachCount: 0,
      riskLevel: 'Low'
    };
  } catch (error) {
    console.error('Password breach check failed:', error);
    throw new Error('Unable to check password against breach database');
  }
}

// Risk level calculation
function getRiskLevel(count) {
  if (count === 0) return 'Low';
  if (count <= 10) return 'Medium';
  if (count <= 100) return 'High';
  return 'Critical';
}

// API usage logging
async function logApiUsage(c, endpoint, statusCode, responseTime) {
  try {
    const sql = getDb(c.env);
    const user = c.get('user');
    
    await sql`
      INSERT INTO api_usage (user_id, endpoint, method, status_code, response_time_ms, ip_address, user_agent)
      VALUES (
        ${user?.userId || null},
        ${endpoint},
        ${c.req.method},
        ${statusCode},
        ${responseTime},
        ${c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For')},
        ${c.req.header('User-Agent')}
      )
    `;
  } catch (error) {
    console.error('Failed to log API usage:', error);
  }
}

// Routes

// Root route
app.get('/', (c) => {
  return c.json({ status: 'ok' });
});

app.get('/api/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.post('/api/auth', async (c) => {
  const startTime = Date.now();
  
  try {
    const { email } = await c.req.json();
    
    if (!email || !email.includes('@')) {
      return c.json({ error: 'Valid email is required' }, 400);
    }
    
    const sql = getDb(c.env);
    
    let userResult = await sql`SELECT * FROM users WHERE email = ${email}`;
    let user;
    
    if (userResult.length === 0) {
      const newUserResult = await sql`
        INSERT INTO users (email, tier, payment_status, created_at)
        VALUES (${email}, 'free', 'pending', NOW())
        RETURNING *
      `;
      user = newUserResult[0];
    } else {
      user = userResult[0];
    }
    
    const token = await createToken({
      userId: user.id,
      email: user.email,
      tier: user.tier
    }, c.env);
    
    const today = new Date().toISOString().split('T')[0];
    const checksUsed = user.last_check_date === today ? (user.daily_checks_used || 0) : 0;
    
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/auth', 200, responseTime);
    
    return c.json({
      token,
      user: {
        email: user.email,
        tier: user.tier,
        paymentStatus: user.payment_status,
        dailyChecks: checksUsed,
        lastCheckDate: user.last_check_date
      }
    });
    
  } catch (error) {
    console.error('Authentication failed:', error);
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/auth', 500, responseTime);
    return c.json({ error: 'Authentication failed', reason: error.message }, 500);
  }
});

app.post('/api/check', authenticate, async (c) => {
  const startTime = Date.now();
  
  try {
    const { password } = await c.req.json();
    const user = c.get('user');
    
    if (!password || typeof password !== 'string' || password.length === 0) {
      return c.json({ success: false, error: 'Password is required' }, 400);
    }
    
    // Hash the password using SHA-1
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    const rateLimitResult = await checkRateLimit(c, user.userId);
    if (!rateLimitResult.allowed) {
      return c.json({
        error: 'Rate limit exceeded',
        reason: 'Daily limit reached for free users',
        resetTime: rateLimitResult.resetTime,
        remaining: rateLimitResult.remaining
      }, 429);
    }
    
    const breachResult = await checkPasswordBreach(hash.toUpperCase());
    
    await updateRateLimit(c, user.userId);
    
    const sql = getDb(c.env);
    await sql`
      INSERT INTO password_checks (user_id, password_hash, is_breached, breach_count, risk_level, ip_address)
      VALUES (
        ${user.userId},
        ${hash.toUpperCase()},
        ${breachResult.isBreached},
        ${breachResult.breachCount},
        ${breachResult.riskLevel},
        ${c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For')}
      )
    `;
    
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/check', 200, responseTime);
    
    return c.json({
      success: true,
      data: {
        isBreached: breachResult.isBreached,
        breachCount: breachResult.breachCount,
        riskLevel: breachResult.riskLevel,
        remainingChecks: rateLimitResult.remaining
      }
    });
    
  } catch (error) {
    console.error('Password check failed:', error);
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/check', 500, responseTime);
    return c.json({ error: 'Password check failed', reason: error.message }, 500);
  }
});

app.get('/api/user', authenticate, async (c) => {
  try {
    const user = c.get('user');
    const sql = getDb(c.env);
    
    const userResult = await sql`
      SELECT email, tier, payment_status, daily_checks_used, last_check_date, created_at
      FROM users 
      WHERE id = ${user.userId}
    `;
    
    if (userResult.length === 0) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    const userData = userResult[0];
    const today = new Date().toISOString().split('T')[0];
    const dailyChecks = userData.last_check_date === today ? (userData.daily_checks_used || 0) : 0;
    
    return c.json({
      success: true,
      data: {
        email: userData.email,
        tier: userData.tier,
        paymentStatus: userData.payment_status,
        dailyChecks,
        lastCheckDate: userData.last_check_date,
        memberSince: userData.created_at
      }
    });
    
  } catch (error) {
    console.error('Get user profile failed:', error);
    return c.json({ success: false, error: 'Failed to get user profile' }, 500);
  }
});

// Check PRO status endpoint
app.get('/api/status', async (c) => {
  try {
    const email = c.req.query('email');
    
    if (!email || !email.includes('@')) {
      return c.json({ success: false, error: 'Valid email is required' }, 400);
    }
    
    const sql = getDb(c.env);
    const userResult = await sql`
      SELECT tier, payment_status, created_at
      FROM users 
      WHERE email = ${email}
    `;
    
    if (userResult.length === 0) {
      return c.json({ 
        success: true, 
        data: { 
          proActive: false, 
          exists: false 
        } 
      });
    }
    
    const userData = userResult[0];
    const proActive = userData.tier === 'pro' && userData.payment_status === 'active';
    
    return c.json({
      success: true,
      data: {
        proActive,
        exists: true,
        tier: userData.tier,
        paymentStatus: userData.payment_status,
        memberSince: userData.created_at
      }
    });
    
  } catch (error) {
    console.error('Status check failed:', error);
    return c.json({ success: false, error: 'Failed to check status' }, 500);
  }
});

app.post('/api/monitor', authenticate, async (c) => {
  try {
    const user = c.get('user');
    const { passwordHash, label } = await c.req.json();
    
    const sql = getDb(c.env);
    const userResult = await sql`SELECT tier FROM users WHERE id = ${user.userId}`;
    
    if (userResult.length === 0 || userResult[0].tier !== 'pro') {
      return c.json({ error: 'PRO subscription required' }, 403);
    }
    
    if (!passwordHash || passwordHash.length !== 40) {
      return c.json({ error: 'Valid SHA-1 hash required' }, 400);
    }
    
    const existingResult = await sql`
      SELECT id FROM monitored_passwords 
      WHERE user_id = ${user.userId} AND password_hash = ${passwordHash.toUpperCase()} AND is_active = true
    `;
    
    if (existingResult.length > 0) {
      return c.json({ error: 'Password already being monitored' }, 400);
    }
    
    const result = await sql`
      INSERT INTO monitored_passwords (user_id, password_hash, password_label, breach_count_last_check)
      VALUES (${user.userId}, ${passwordHash.toUpperCase()}, ${label || null}, 0)
      RETURNING id
    `;
    
    return c.json({
      success: true,
      monitoringId: result[0].id
    });
    
  } catch (error) {
    console.error('Add monitoring failed:', error);
    return c.json({ error: 'Failed to add password to monitoring' }, 500);
  }
});

app.get('/api/monitored', authenticate, async (c) => {
  try {
    const user = c.get('user');
    const sql = getDb(c.env);
    
    const userResult = await sql`SELECT tier FROM users WHERE id = ${user.userId}`;
    
    if (userResult.length === 0 || userResult[0].tier !== 'pro') {
      return c.json({ error: 'PRO subscription required' }, 403);
    }
    
    const result = await sql`
      SELECT id, password_hash, password_label, breach_count_last_check, created_at, last_checked
      FROM monitored_passwords
      WHERE user_id = ${user.userId} AND is_active = true
      ORDER BY created_at DESC
    `;
    
    return c.json({
      monitoredPasswords: result.map(row => ({
        id: row.id,
        passwordHash: row.password_hash,
        passwordLabel: row.password_label,
        breachCountLastCheck: row.breach_count_last_check,
        createdAt: row.created_at,
        lastChecked: row.last_checked
      }))
    });
    
  } catch (error) {
    console.error('Get monitored passwords failed:', error);
    return c.json({ error: 'Failed to get monitored passwords' }, 500);
  }
});

app.delete('/api/monitor/:id', authenticate, async (c) => {
  try {
    const user = c.get('user');
    const monitoringId = c.req.param('id');
    const sql = getDb(c.env);
    
    const result = await sql`
      UPDATE monitored_passwords 
      SET is_active = false
      WHERE id = ${monitoringId} AND user_id = ${user.userId}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return c.json({ error: 'Monitored password not found' }, 404);
    }
    
    return c.json({ success: true });
    
  } catch (error) {
    console.error('Remove monitoring failed:', error);
    return c.json({ error: 'Failed to remove password monitoring' }, 500);
  }
});

// --- COINBASE COMMERCE INTEGRATION ---

/**
 * Create a charge for PRO subscription via Coinbase Commerce
 * @param {string} email - User email
 * @param {string} userId - User ID
 * @param {object} env - Environment variables
 * @returns {Promise<{success: boolean, charge?: object, error?: string}>}
 */
async function createCoinbaseCharge(email, userId, env) {
  try {
    if (!env.COINBASE_COMMERCE_API_KEY) {
      throw new Error('COINBASE_COMMERCE_API_KEY environment variable is required');
    }

    const chargeData = {
      name: 'Password Leaker PRO Subscription',
      description: 'Unlimited password breach checking and monitoring features',
      local_price: {
        amount: '9.99',
        currency: 'USD'
      },
      pricing_type: 'fixed_price',
      metadata: {
        user_id: userId,
        user_email: email,
        product: 'password_leaker_pro'
      }
    };

    console.log(`Creating Coinbase Commerce charge for user: ${email}`);

    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': env.COINBASE_COMMERCE_API_KEY,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify(chargeData)
    });

    const data = await response.json();
    console.log('Coinbase Commerce API response:', { success: response.ok, status: response.status });

    if (!response.ok) {
      return {
        success: false,
        error: `Coinbase Commerce API error: ${response.status} - ${data.error?.message || 'Unknown error'}`
      };
    }

    return {
      success: true,
      charge: data.data
    };

  } catch (error) {
    console.error('Coinbase Commerce charge creation failed:', error);
    return {
      success: false,
      error: 'Unable to create payment charge - please try again later'
    };
  }
}

/**
 * Verify Coinbase Commerce webhook signature
 * @param {string} payload - Webhook payload
 * @param {string} signature - Webhook signature
 * @param {string} secret - Webhook secret
 * @returns {boolean}
 */
async function verifyCoinbaseWebhook(payload, signature, secret) {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return signature.toLowerCase() === expectedHex.toLowerCase();
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return false;
  }
}

app.post('/api/create-charge', authenticate, async (c) => {
  const startTime = Date.now();
  
  try {
    const user = c.get('user');
    console.log(`Creating PRO charge for user: ${user.email}`);

    const sql = getDb(c.env);
    
    // Check if user is already PRO
    const userResult = await sql`
      SELECT tier, payment_status 
      FROM users 
      WHERE id = ${user.userId}
    `;
    
    if (userResult.length === 0) {
      return c.json({ error: 'User not found' }, 404);
    }

    const userData = userResult[0];
    if (userData.tier === 'pro' && userData.payment_status === 'active') {
      return c.json({
        success: false,
        error: 'PRO features are already active for this account'
      }, 400);
    }

    // Create Coinbase Commerce charge
    const chargeResult = await createCoinbaseCharge(user.email, user.userId, c.env);

    if (!chargeResult.success) {
      console.log(`Charge creation failed for ${user.email}: ${chargeResult.error}`);
      
      const responseTime = Date.now() - startTime;
      await logApiUsage(c, '/api/create-charge', 500, responseTime);
      
      return c.json({ 
        error: chargeResult.error,
        code: 'CHARGE_CREATION_FAILED'
      }, 500);
    }

    // Store charge information in database
    await sql`
      INSERT INTO payment_transactions (
        user_id, 
        payment_provider, 
        transaction_id, 
        amount, 
        currency,
        status, 
        webhook_verified,
        purchase_data
      )
      VALUES (
        ${user.userId},
        'coinbase_commerce',
        ${chargeResult.charge.id},
        ${Math.round(parseFloat(chargeResult.charge.pricing.local.amount) * 100)}, -- Convert to cents
        ${chargeResult.charge.pricing.local.currency},
        'pending',
        false,
        ${JSON.stringify(chargeResult.charge)}
      )
    `;

    console.log(`Charge created successfully for user: ${user.email}, charge ID: ${chargeResult.charge.id}`);

    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/create-charge', 200, responseTime);

    return c.json({
      success: true,
      message: 'Payment charge created successfully',
      charge: {
        id: chargeResult.charge.id,
        hosted_url: chargeResult.charge.hosted_url,
        pricing: chargeResult.charge.pricing,
        expires_at: chargeResult.charge.expires_at
      }
    });

  } catch (error) {
    console.error('Charge creation failed:', error);
    
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/create-charge', 500, responseTime);
    
    return c.json({ 
      error: 'Charge creation failed due to server error',
      code: 'INTERNAL_ERROR',
      reason: error.message 
    }, 500);
  }
});

// Coinbase Commerce webhook handler
app.post('/api/webhooks/coinbase', async (c) => {
  const startTime = Date.now();
  
  try {
    const signature = c.req.header('X-CC-Webhook-Signature');
    const payload = await c.req.text();
    
    // Verify webhook signature
    if (!c.env.COINBASE_COMMERCE_WEBHOOK_SECRET) {
      console.error('COINBASE_COMMERCE_WEBHOOK_SECRET not configured');
      return c.json({ error: 'Webhook configuration error' }, 500);
    }
    
    const isValid = await verifyCoinbaseWebhook(payload, signature, c.env.COINBASE_COMMERCE_WEBHOOK_SECRET);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return c.json({ error: 'Invalid webhook signature' }, 401);
    }

    const event = JSON.parse(payload);
    console.log(`Coinbase webhook received: ${event.type}, charge: ${event.data?.id}`);

    if (event.type === 'charge:confirmed' || event.type === 'charge:resolved') {
      const charge = event.data;
      const metadata = charge.metadata;
      
      if (metadata?.user_id && metadata?.product === 'password_leaker_pro') {
        const sql = getDb(c.env);
        
        // Update user to PRO tier
        const upgradeResult = await sql`
          UPDATE users
          SET tier = 'pro', 
              payment_status = 'active', 
              updated_at = NOW()
          WHERE id = ${metadata.user_id}
          RETURNING email, tier, payment_status
        `;

        if (upgradeResult.length > 0) {
          // Update payment transaction status
          await sql`
            UPDATE payment_transactions 
            SET status = 'completed',
                webhook_verified = true,
                updated_at = NOW()
            WHERE transaction_id = ${charge.id} AND user_id = ${metadata.user_id}
          `;

          console.log(`PRO upgrade successful for user ID: ${metadata.user_id}, email: ${upgradeResult[0].email}`);
        }
      }
    }

    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/webhooks/coinbase', 200, responseTime);

    return c.json({ received: true });
    
  } catch (error) {
    console.error('Coinbase webhook failed:', error);
    
    const responseTime = Date.now() - startTime;
    await logApiUsage(c, '/api/webhooks/coinbase', 500, responseTime);
    
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// Webhook placeholders for Stripe and PayPal

app.post('/api/webhooks/stripe', async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    const payload = await c.req.text();

    // TODO: Verify Stripe webhook signature

    return c.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook failed:', error);
    return c.json({ error: 'Webhook processing failed' }, 400);
  }
});

app.post('/api/webhooks/paypal', async (c) => {
  try {
    const payload = await c.req.json();

    // TODO: Verify PayPal webhook signature

    return c.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook failed:', error);
    return c.json({ error: 'Webhook processing failed' }, 400);
  }
});

// Error handling middleware
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({ 
    error: 'Internal server error',
    message: err.message 
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

export default {
  fetch: app.fetch,
};
