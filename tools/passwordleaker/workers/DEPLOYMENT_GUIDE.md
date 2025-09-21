# Backend Deployment Guide

## Prerequisites

1. **Cloudflare Workers CLI (Wrangler)**
   ```bash
   npm install -g wrangler
   wrangler auth login
   ```

2. **NeonDB Database**
   - Create a PostgreSQL database on [Neon](https://neon.tech)
   - Note your connection string

3. **Coinbase Commerce Account**
   - Create account at [Coinbase Commerce](https://commerce.coinbase.com)
   - Get your API Key and Webhook Secret

## Environment Setup

### 1. Set Required Secrets
```bash
# Set database connection
wrangler secret put NEON_DB_URL

# Set JWT secret (generate a secure 256-bit key)
wrangler secret put JWT_SECRET

# Set Coinbase Commerce credentials
wrangler secret put COINBASE_COMMERCE_API_KEY
wrangler secret put COINBASE_COMMERCE_WEBHOOK_SECRET
```

### 2. Database Setup
```bash
# Connect to your NeonDB and run:
psql "your-neon-connection-string" -f database/production-schema.sql
```

## Deployment Commands

### Development
```bash
wrangler deploy --env development
```

### Staging
```bash
wrangler deploy --env staging
```

### Production
```bash
wrangler deploy --env production
```

## API Endpoints

After deployment, your API will be available at:
- **Production**: `https://password-leaker-api.darkdenti44.workers.dev`
- **Development**: `https://password-leaker-api-dev.darkdenti44.workers.dev`

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check - returns `{"status":"ok"}` |
| `/api/health` | GET | Detailed health check |
| `/api/check` | POST | Check password for breaches (requires auth) |
| `/api/status` | GET | Check PRO status by email |
| `/api/auth` | POST | User authentication |
| `/api/create-charge` | POST | Create Coinbase Commerce charge |
| `/api/webhooks/coinbase` | POST | Coinbase Commerce webhook handler |

### Testing the API

1. **Health Check**
   ```bash
   curl https://password-leaker-api.darkdenti44.workers.dev/
   # Expected: {"status":"ok"}
   ```

2. **Password Check** (requires authentication)
   ```bash
   # First authenticate
   curl -X POST https://password-leaker-api.darkdenti44.workers.dev/api/auth \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   
   # Use the returned token to check a password
   curl -X POST https://password-leaker-api.darkdenti44.workers.dev/api/check \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"password":"password123"}'
   ```

3. **Status Check**
   ```bash
   curl "https://password-leaker-api.darkdenti44.workers.dev/api/status?email=test@example.com"
   ```

## Coinbase Commerce Setup

1. **Create Webhook**
   - Go to Coinbase Commerce Dashboard
   - Add webhook URL: `https://password-leaker-api.darkdenti44.workers.dev/api/webhooks/coinbase`
   - Select events: `charge:confirmed`, `charge:resolved`

2. **Test Payment Flow**
   - User clicks "Upgrade to PRO"
   - Frontend calls `/api/create-charge`
   - User completes payment on Coinbase
   - Webhook automatically upgrades user to PRO

## Monitoring

- API usage is logged in the `api_usage` table
- Payment transactions are tracked in `payment_transactions`
- Console logs available in Cloudflare Workers dashboard

## Security Notes

- All secrets are encrypted in Cloudflare Workers
- Webhook signatures are verified
- JWT tokens expire in 24 hours
- Rate limiting enforced for free users
- CORS configured for specific origins only

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify NEON_DB_URL is set correctly
   - Check NeonDB is not sleeping (if using free tier)

2. **JWT Errors**
   - Ensure JWT_SECRET is 256+ bits
   - Check token expiration

3. **Coinbase Webhook Failures**
   - Verify webhook URL is accessible
   - Check webhook secret matches
   - Ensure proper event types are selected

### Debug Commands

```bash
# View logs
wrangler tail

# Check secrets
wrangler secret list

# Test deployment
wrangler dev
```