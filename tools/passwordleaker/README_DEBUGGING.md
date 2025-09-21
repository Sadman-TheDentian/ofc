# Debugging Guide

## Current Issues Being Fixed

### 1. API URL Mismatch ✅ FIXED
- **Problem**: Frontend was calling `https://passwordleaker.denti.systems` 
- **Solution**: Updated to `https://password-leaker-api.darkdenti44.workers.dev`
- **Files Modified**: `.env`, `src/services/api.ts`, `workers/api.js` (CORS)

### 2. Worker API Status 🔄 IN PROGRESS
Check if your worker is deployed and accessible:

```bash
# Test the worker API directly
curl https://password-leaker-api.darkdenti44.workers.dev/
# Expected: {"status":"ok"}

# Test health endpoint
curl https://password-leaker-api.darkdenti44.workers.dev/api/health
```

### 3. Missing Environment Variables
Make sure these are set in Cloudflare Workers:
- `NEON_DB_URL` 
- `JWT_SECRET`
- `COINBASE_COMMERCE_API_KEY`
- `COINBASE_COMMERCE_WEBHOOK_SECRET`

```bash
cd workers
wrangler secret put NEON_DB_URL
wrangler secret put JWT_SECRET
wrangler secret put COINBASE_COMMERCE_API_KEY
wrangler secret put COINBASE_COMMERCE_WEBHOOK_SECRET
```

### 4. Deploy Worker if Not Deployed
```bash
cd workers
wrangler deploy --env production
```

### 5. Database Setup
Make sure your NeonDB has the correct schema:
```bash
psql "your-neon-connection-string" -f database/production-schema.sql
```

## Next Steps

1. **Deploy the worker** (if not already deployed)
2. **Set all required secrets**
3. **Test API endpoints manually**
4. **Try authentication again**

## Quick Test Commands

```bash
# 1. Test API is working
curl https://password-leaker-api.darkdenti44.workers.dev/

# 2. Test auth endpoint
curl -X POST https://password-leaker-api.darkdenti44.workers.dev/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 3. Test status endpoint  
curl "https://password-leaker-api.darkdenti44.workers.dev/api/status?email=test@example.com"
```

Expected responses:
1. `{"status":"ok"}`
2. Should return JWT token and user data
3. Should return user status