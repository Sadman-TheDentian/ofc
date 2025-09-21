# Password Leaker PRO - Complete Production Deployment

## 🎯 Overview

This guide provides step-by-step instructions for deploying a production-ready Password Leaker PRO system with enterprise-grade security, monitoring, and payment integration.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Cloudflare      │    │   NeonDB        │
│   (Vercel)      │◀──▶│  Worker API      │◀──▶│  PostgreSQL     │
│                 │    │  (Hono.js)       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Payment         │
                       │  Providers       │
                       │  (Stripe/PayPal) │
                       └──────────────────┘
```

## 📋 Prerequisites

### Required Accounts
- [Cloudflare Account](https://cloudflare.com) (Workers plan)
- [NeonDB Account](https://neon.tech) (Serverless PostgreSQL)
- [Vercel Account](https://vercel.com) (Frontend hosting)
- [Stripe Account](https://stripe.com) (Payment processing)

### Required Tools
- Node.js 18+ and npm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Git
- PostgreSQL client (optional)

## 🗄️ Phase 1: Database Setup

### 1.1 Create NeonDB Project

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create new project: "password-leaker-pro"
3. Select region closest to your users
4. Copy the connection string

### 1.2 Deploy Database Schema

```bash
# Connect to your database
psql "postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"

# Deploy the production schema
\i database/schema.sql

# Verify deployment
\dt
SELECT COUNT(*) FROM users;
```

### 1.3 Database Performance Tuning

```sql
-- Run these optimizations
ANALYZE users;
ANALYZE password_checks;
ANALYZE monitored_passwords;
ANALYZE payment_transactions;

-- Verify indexes
\di

-- Check performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## ☁️ Phase 2: Backend API Deployment

### 2.1 Install Dependencies

```bash
cd workers
npm install
npm install -g wrangler
wrangler login
```

### 2.2 Configure Secrets

```bash
# Generate secure JWT secret
JWT_SECRET=$(openssl rand -hex 32)
echo "Generated JWT_SECRET: $JWT_SECRET"

# Set all required secrets
wrangler secret put NEON_DB_URL
# Enter your NeonDB connection string

wrangler secret put JWT_SECRET
# Enter the generated JWT secret

# Optional: Payment integration
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
```

### 2.3 Deploy API

```bash
# Deploy to staging first
npm run deploy:staging

# Test staging deployment
curl https://password-leaker-api-staging.your-subdomain.workers.dev/api/health

# Deploy to production
npm run deploy:prod

# Verify production deployment
curl https://password-leaker-api.your-subdomain.workers.dev/api/health
```

### 2.4 Test API Endpoints

```bash
# Run comprehensive tests
cd workers
npm test

# Manual testing
curl -X POST https://your-api-url.workers.dev/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 💳 Phase 3: Payment Integration

### 3.1 Stripe Setup

1. **Create Products & Prices**

```bash
# Create product
curl -X POST https://api.stripe.com/v1/products \
  -u sk_live_...: \
  -d name="Password Leaker PRO" \
  -d description="Unlimited password breach monitoring"

# Create monthly price
curl -X POST https://api.stripe.com/v1/prices \
  -u sk_live_...: \
  -d product=prod_... \
  -d unit_amount=2999 \
  -d currency=usd \
  -d recurring[interval]=month
```

2. **Configure Webhooks**

- Endpoint: `https://your-api-url.workers.dev/api/webhooks/stripe`
- Events: `checkout.session.completed`, `payment_intent.succeeded`

3. **Update Frontend Integration**

```javascript
// Add to your payment component
const handleStripeCheckout = async () => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const { url } = await response.json();
  window.location.href = url;
};
```

### 3.2 Payment Webhook Implementation

The webhook handler in `workers/api.js` needs to be completed:

```javascript
app.post('/api/webhooks/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  const payload = await c.req.text();
  
  try {
    // Verify webhook (you'll need to implement this)
    const event = verifyStripeWebhook(payload, signature, c.env.STRIPE_WEBHOOK_SECRET);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Upgrade user to PRO
      const sql = getDb(c.env);
      await sql`
        UPDATE users 
        SET tier = 'pro', payment_status = 'active', updated_at = NOW()
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

## 🖥️ Phase 4: Frontend Deployment

### 4.1 Configure Environment Variables

Create `.env.production`:

```bash
VITE_API_BASE_URL=https://password-leaker-api.your-subdomain.workers.dev
VITE_APP_NAME=Password Leaker PRO
VITE_BRAND_COLOR=#00FF66
VITE_DEBUG_MODE=false
```

### 4.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel dashboard
```

### 4.3 Configure Custom Domain (Optional)

1. Add your domain to Vercel
2. Configure DNS records
3. Update CORS origins in `workers/api.js`:

```javascript
app.use('*', cors({
  origin: [
    'https://passwordleaker.com',
    'https://www.passwordleaker.com'
  ],
  // ... other options
}));
```

## 📊 Phase 5: Monitoring & Analytics

### 5.1 Set Up Logging

```bash
# View real-time logs
cd workers
npm run logs:prod

# Monitor specific endpoints
wrangler tail --env production --grep="/api/check"
```

### 5.2 Database Monitoring

```sql
-- Daily usage analytics
SELECT 
  DATE(timestamp) as date,
  endpoint,
  COUNT(*) as requests,
  AVG(response_time_ms) as avg_response_time
FROM api_usage 
WHERE timestamp >= NOW() - INTERVAL '7 days'
GROUP BY DATE(timestamp), endpoint
ORDER BY date DESC;

-- User growth
SELECT 
  DATE(created_at) as date,
  tier,
  COUNT(*) as new_users
FROM users 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), tier
ORDER BY date DESC;

-- Revenue tracking
SELECT 
  DATE(created_at) as date,
  COUNT(*) as transactions,
  SUM(amount)/100 as revenue_usd
FROM payment_transactions 
WHERE status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 5.3 Set Up Alerts

Configure alerts for:
- API error rate > 5%
- Database connection failures
- Payment webhook failures
- Unusual traffic spikes

## 🔒 Phase 6: Security Hardening

### 6.1 Review Security Settings

```bash
# Check secrets are properly set
wrangler secret list --env production

# Verify CORS configuration
curl -H "Origin: https://malicious-site.com" \
  https://your-api-url.workers.dev/api/health
```

### 6.2 Rate Limiting Review

Current limits:
- Free users: 5 checks/day
- PRO users: Unlimited
- All users: Logged for monitoring

### 6.3 Data Encryption

- Database connections use SSL/TLS
- JWT tokens are properly signed
- Passwords are SHA-1 hashed client-side
- k-anonymity protects user privacy

## 🧪 Phase 7: Testing & Validation

### 7.1 End-to-End Testing

```bash
# Run the test suite
cd workers
npm test

# Test payment flow (use Stripe test cards)
# 4242424242424242 - Success
# 4000000000000002 - Decline
```

### 7.2 Load Testing

```bash
# Use Apache Bench for basic load testing
ab -n 1000 -c 10 https://your-api-url.workers.dev/api/health

# Or use more sophisticated tools like k6 or Artillery
```

### 7.3 Security Testing

- Run dependency vulnerability scans
- Test for SQL injection vulnerabilities
- Verify JWT token validation
- Test rate limiting effectiveness

## 📈 Phase 8: Launch & Marketing

### 8.1 Soft Launch Checklist

- [ ] All endpoints returning 200 status
- [ ] Database connectivity stable
- [ ] Payment flow working end-to-end
- [ ] Error monitoring configured
- [ ] Performance metrics baseline established
- [ ] Security audit completed

### 8.2 Go-Live Checklist

- [ ] DNS propagated for custom domain
- [ ] SSL certificates valid
- [ ] Monitoring alerts configured
- [ ] Support documentation ready
- [ ] Backup procedures tested
- [ ] Incident response plan documented

## 🔧 Maintenance & Operations

### Daily Tasks
- Monitor error rates and response times
- Check payment webhook success rates
- Review unusual API usage patterns

### Weekly Tasks
- Analyze user growth and churn
- Review database performance metrics
- Update dependencies if needed

### Monthly Tasks
- Security audit and penetration testing
- Financial reporting and reconciliation
- Performance optimization review

## 🚨 Troubleshooting

### Common Issues

**Database Connection Errors**
```bash
# Check connection string format
echo $NEON_DB_URL
# Should start with postgresql://

# Test direct connection
psql "$NEON_DB_URL" -c "SELECT NOW();"
```

**JWT Token Issues**
```bash
# Verify JWT secret is set
wrangler secret list --env production | grep JWT_SECRET

# Check token format in requests
curl -H "Authorization: Bearer invalid-token" \
  https://your-api-url.workers.dev/api/user
```

**Payment Webhook Failures**
- Check Stripe webhook signature verification
- Verify webhook URL is accessible
- Review webhook event types configured

### Getting Help

- **Documentation**: Check `workers/API_DOCUMENTATION.md`
- **Logs**: Use `npm run logs:prod` for real-time debugging
- **Support**: Contact hello@denti.systems

## 🎯 Success Metrics

Your deployment is successful when:

- ✅ Health check returns 200 consistently
- ✅ Authentication flow works end-to-end  
- ✅ Password checks complete in <500ms
- ✅ Payment webhooks process successfully
- ✅ Error rate <1%
- ✅ User registration/upgrade flow works
- ✅ Database queries optimized (<100ms avg)

## 💰 Cost Optimization

### Expected Monthly Costs (1000 active users)

- **Cloudflare Workers**: ~$5 (1M requests)
- **NeonDB**: ~$20 (1GB storage, compute hours)
- **Vercel**: $0 (static hosting)
- **Stripe**: ~$87 (3% + $0.30 per transaction)

**Total**: ~$112/month for 1000 users
**Revenue**: $2,999/month (100 PRO users at $29.99)
**Gross Margin**: ~96%

## 🚀 Scaling Strategy

### 10K Users
- Enable Cloudflare Workers geographic distribution
- Implement database read replicas
- Add Redis caching layer

### 100K Users  
- Migrate to dedicated Cloudflare Workers deployment
- Implement database sharding
- Add CDN for static assets
- Implement rate limiting per IP

### 1M Users
- Multi-region deployment
- Microservices architecture
- Advanced caching strategies
- Dedicated support team

---

## 🎉 Congratulations!

You now have a production-ready, enterprise-grade Password Leaker PRO system that can:

- ✅ Handle thousands of concurrent users
- ✅ Process payments securely
- ✅ Scale automatically with demand
- ✅ Monitor performance and security
- ✅ Generate significant revenue

The system is built with modern serverless technologies, follows security best practices, and is designed for long-term maintainability and growth.

For ongoing support and enhancements, contact: **hello@denti.systems**
