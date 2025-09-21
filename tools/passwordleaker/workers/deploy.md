# Quick Deploy Commands

## Deploy to production
```bash
cd workers
wrangler deploy --env production
```

## Check deployment status
```bash
wrangler deployments list
```

## Test the API
```bash
curl https://password-leaker-api.darkdenti44.workers.dev/
# Should return: {"status":"ok"}
```

## Set secrets (if not set)
```bash
wrangler secret put NEON_DB_URL --env production
wrangler secret put JWT_SECRET --env production  
wrangler secret put COINBASE_COMMERCE_API_KEY --env production
wrangler secret put COINBASE_COMMERCE_WEBHOOK_SECRET --env production
```

## View logs
```bash
wrangler tail --env production
```