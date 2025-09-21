# Quick Fix - Redeploy Worker

The worker code has the correct routes but returns 404. This usually means:

## 1. Redeploy the Worker

```bash
cd workers
wrangler deploy --env production
```

## 2. Test Each Secret is Set

```bash
# Check if secrets are properly set
wrangler secret list

# Should show:
# COINBASE_COMMERCE_API_KEY
# COINBASE_COMMERCE_WEBHOOK_SECRET  
# NEON_DB_URL
# JWT_SECRET
```

## 3. Check Worker Logs

```bash
wrangler tail --env production
```

## 4. Quick Test

After deployment, test:

```bash
# Should return: {"status":"ok"}
curl https://password-leaker-api.darkdenti44.workers.dev/

# Should return health info
curl https://password-leaker-api.darkdenti44.workers.dev/api/health
```

If still 404, the issue is likely:
- Worker not deployed to the correct subdomain
- Environment variables missing/incorrect
- Build failures during deployment

## 5. If Still Broken

Check deployment logs:
```bash
wrangler deploy --env production --verbose
```

Look for any error messages during deployment.