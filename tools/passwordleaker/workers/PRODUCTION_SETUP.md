
# Password Leaker PRO - Production Setup Guide

## 🚀 Complete Production Deployment

This guide covers deploying the Password Leaker PRO API to production with full security, monitoring, and payment integration.

## 📋 Prerequisites

- [Cloudflare Account](https://cloudflare.com) with Workers plan
- [NeonDB Account](https://neon.tech) with PostgreSQL database
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed
- Node.js 18+ installed locally

## 🗄️ Database Setup

### 1. Create NeonDB Database

```bash
# Connect to your NeonDB database
psql "postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"

# Run the complete schema
\i ../database/schema.sql

# Verify tables created
\dt

# Check sample data
SELECT * FROM users;
```

### 2. Database Performance Optimization

```sql
-- Additional production optimizations
ANALYZE users;
ANALYZE password_checks;
ANALYZE monitored_passwords;
ANALYZE payment_transactions;

-- Verify indexes
\di
```

## ⚙️ Environment Setup

### 1. Install Dependencies

```bash
cd workers
npm install
```

### 2. Set Required Secrets

```bash
# Core secrets (required)
wrangler secret put NEON_DB_URL
# Enter: postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require

wrangler secret put JWT_SECRET
# Enter: 64-character random string (generate with: openssl rand -hex 32)

# Payment integration secrets (optional but recommended)
wrangler secret put STRIPE_SECRET_KEY
# Enter your Stripe secret key from dashboard

wrangler secret put STRIPE_WEBHOOK_SECRET
# Enter your Stripe webhook signing secret

# PayPal integration (optional)
wrangler secret put PAYPAL_CLIENT_ID
wrangler secret put PAYPAL_CLIENT_SECRET
```

### 3. Environment-Specific Deployment

```bash
# Deploy to development
npm run deploy:dev

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

## 🔒 Security Configuration

### 1. JWT Secret Generation

```bash
# Generate secure JWT secret
openssl rand -hex 32
```

### 2. CORS Configuration

Update `api.js` with your production domains:

```javascript
app.use('*', cors({
  origin: [
    'https://your-domain.com',
    'https://www.your-domain.com'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### 3. Rate Limiting

Current limits (configurable in code):
- Free users: 5 password checks per day
- PRO users: Unlimited checks
- API requests: Logged for monitoring

## 💳 Payment Integration

### Stripe Integration

1. **Create Stripe Product & Prices**

```bash
# Create product
curl -X POST https://api.stripe.com/v1/products \
  -u sk_test_...: \
  -d name="Password Leaker PRO" \
  -d description="Unlimited password breach monitoring"

# Create price
curl -X POST https://api.stripe.com/v1/prices \
  -u sk_test_...: \
  -d product=prod_... \
  -d unit_amount=2999 \
  -d currency=usd \
  -d recurring[interval]=month
```

2. **Setup Webhook Endpoint**

- Go to Stripe Dashboard → Webhooks
- Add endpoint: `https://your-worker.workers.dev/api/webhooks/stripe`
- Select events: `checkout.session.completed`, `payment_intent.succeeded`

3. **Update Payment Webhook Handler**

```javascript
// In api.js - replace placeholder webhook handler
app.post('/api/webhooks/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  const payload = await c.req.text();
  
  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      payload, 
      signature, 
      c.env.STRIPE_WEBHOOK_SECRET
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Update user to PRO
      const sql = getDb(c.env);
      await sql`
        UPDATE users 
        SET tier = 'pro', payment_status = 'active'
        WHERE email = ${session.customer_email}
      `;
      
      // Log transaction
      await sql`
        INSERT INTO payment_transactions 
        (user_id, payment_provider, transaction_id, amount, status, webhook_verified)
        VALUES (
          (SELECT id FROM users WHERE email = ${session.customer_email}),
          'stripe',
          ${session.id},
          ${session.amount_total},
          'completed',
          true
        )
      `;
    }
    
    return c.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return c.json({ error: error.message }, 400);
  }
});
```

## 📊 Monitoring & Logging

### 1. Real-time Logs

```bash
# View production logs
npm run logs:prod

# Filter by specific routes
wrangler tail --env production --grep="/api/check"
```

### 2. Usage Analytics

Query the database for insights:

```sql
-- Daily API usage
SELECT 
  DATE(timestamp) as date,
  endpoint,
  COUNT(*) as requests,
  AVG(response_time_ms) as avg_response_time
FROM api_usage 
WHERE timestamp >= NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp), endpoint
ORDER BY date DESC;

-- User tier distribution
SELECT tier, COUNT(*) FROM users GROUP BY tier;

-- Password check statistics
SELECT 
  risk_level,
  COUNT(*) as checks,
  AVG(breach_count) as avg_breaches
FROM password_checks 
GROUP BY risk_level;
```

### 3. Error Monitoring

Set up alerts for:
- High error rates (>5% 5xx responses)
- Database connection failures
- Rate limit violations
- Payment webhook failures

## 🧪 Testing

### 1. API Health Check

```bash
curl https://your-worker.workers.dev/api/health
```

### 2. Authentication Flow

```bash
# Register/login user
curl -X POST https://your-worker.workers.dev/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Use returned token for authenticated requests
curl https://your-worker.workers.dev/api/user \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### 3. Password Check

```bash
# Check a known breached password (SHA-1 of "password")
curl "https://your-worker.workers.dev/api/check?hash=5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8" \
  -H "Authorization: Bearer your-jwt-token"
```

## 🔧 Performance Optimization

### 1. Database Connection Pooling

```javascript
// Already configured in api.js
neonConfig.fetchConnectionCache = true;
```

### 2. Caching Strategy

Consider implementing caching for:
- HIBP API responses (24 hour TTL)
- User tier lookups (1 hour TTL)
- Rate limit counters (Redis/KV)

### 3. Geographic Distribution

Deploy to multiple Cloudflare regions:

```toml
# In wrangler.toml
[placement]
mode = "smart"
```

## 🚨 Production Checklist

- [ ] Database schema deployed
- [ ] All secrets configured
- [ ] CORS origins updated
- [ ] Stripe/PayPal webhooks configured
- [ ] Error monitoring setup
- [ ] API documentation updated
- [ ] Load testing completed
- [ ] Security audit performed
- [ ] Backup procedures established

## 📈 Scaling Considerations

### Database Scaling
- Monitor connection pool usage
- Consider read replicas for analytics
- Implement query optimization

### API Scaling
- Monitor CPU/memory usage
- Implement request queuing if needed
- Consider caching layer (Redis)

### Cost Optimization
- Monitor Cloudflare Workers usage
- Optimize database queries
- Implement request bundling

## 🔄 Maintenance

### Regular Tasks
- Monitor error rates and performance
- Update dependencies monthly
- Review and rotate secrets quarterly
- Analyze usage patterns and optimize

### Backup Strategy
- Database: Automated NeonDB backups
- Secrets: Store securely in password manager
- Code: Git repository with tagged releases

## 📞 Support

For issues or questions:
- Check logs: `npm run logs:prod`
- Review error monitoring dashboard
- Contact: hello@denti.systems

---

## 🎯 Success Metrics

Your API is production-ready when:
- Health check returns 200 consistently
- Authentication flow works end-to-end
- Payment webhooks process successfully
- Rate limiting functions correctly
- Error rates < 1%
- Response times < 500ms average

The Password Leaker PRO API is now enterprise-grade and ready for production traffic!
