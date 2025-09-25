import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { neon, neonConfig } from '@neondatabase/serverless';
import { sign, verify } from 'hono/jwt';
import crypto from 'crypto';

// This is a temporary solution. In a real production environment,
// these secrets should be set as environment variables in the Cloudflare Worker dashboard.
const TEMP_COINBASE_API_KEY = '703f661f-a9fa-4e79-954f-86292261dc31';


neonConfig.fetchConnectionCache = true;


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
      INSERT INTO monitored_passwords (user_id, user_email, password_hash, password_label, breach_count_last_check)
      VALUES (${user.userId}, ${user.email}, ${passwordHash.toUpperCase()}, ${label || null}, 0)
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

async function createCoinbaseCharge(email, userId, env) {
  try {
    const apiKey = env.COINBASE_COMMERCE_API_KEY || TEMP_COINBASE_API_KEY;
    if (!apiKey) {
      throw new Error('COINBASE_COMMERCE_API_KEY is not configured.');
    }

    const chargeData = {
      name: 'Password Leaker PRO',
      description: 'Unlimited password checks and continuous monitoring.',
      local_price: {
        amount: '9.99',
        currency: 'USD'
      },
      pricing_type: 'fixed_price',
      metadata: {
        user_id: userId,
        user_email: email,
        product: 'password_leaker_pro'
      },
      redirect_url: 'https://dentisystems.com/tools/passwordleaker/dashboard',
      cancel_url: 'https://dentisystems.com/tools/passwordleaker/pricing',
    };

    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify(chargeData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Coinbase Commerce API error: ${data.error?.message || 'Unknown error'}`);
    }

    return { success: true, charge: data.data };
  } catch (error) {
    console.error('Coinbase Commerce charge creation failed:', error);
    return { success: false, error: 'Failed to create payment charge.' };
  }
}

async function verifyCoinbaseWebhook(payload, signature, secret) {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload, 'utf8');
    const expectedSignature = hmac.digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return false;
  }
}

app.post('/api/create-charge', authenticate, async (c) => {
  const user = c.get('user');
  const chargeResult = await createCoinbaseCharge(user.email, user.userId, c.env);

  if (!chargeResult.success) {
    return c.json({ error: chargeResult.error }, 500);
  }

  return c.json({ success: true, charge: chargeResult.charge });
});

app.post('/api/webhooks/coinbase', async (c) => {
  const signature = c.req.header('X-CC-Webhook-Signature');
  const payload = await c.req.text();
  const secret = c.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

  if (!secret) {
    console.error('Webhook secret not configured');
    return c.json({ error: 'Webhook not configured' }, 500);
  }
  
  const isValid = await verifyCoinbaseWebhook(payload, signature, secret);
  if (!isValid) {
    return c.json({ error: 'Invalid webhook signature' }, 401);
  }

  const event = JSON.parse(payload);
  if (event.type === 'charge:confirmed' || event.type === 'charge:resolved') {
    const charge = event.data;
    const metadata = charge.metadata;

    if (metadata?.user_id) {
      const sql = getDb(c.env);
      await sql`
        UPDATE users
        SET tier = 'pro', payment_status = 'active', updated_at = NOW()
        WHERE id = ${metadata.user_id}
      `;
      console.log(`User ${metadata.user_id} upgraded to PRO.`);
    }
  }

  return c.json({ received: true });
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
