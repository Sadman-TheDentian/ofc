
# Password Leaker PRO API Documentation

## Base URL
- **Production**: `https://password-leaker-api.your-subdomain.workers.dev`
- **Staging**: `https://password-leaker-api-staging.your-subdomain.workers.dev`

## Authentication

All endpoints except `/api/health` and `/api/auth` require JWT authentication.

**Header**: `Authorization: Bearer <jwt-token>`

## Endpoints

### Health Check

**GET** `/api/health`

Check API status and connectivity.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

### Authentication

**POST** `/api/auth`

Authenticate user and get JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "paymentCode": "optional-12-chars" // Temporary PRO activation
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "user@example.com",
    "tier": "free", // or "pro"
    "paymentStatus": "pending", // pending|active|expired|cancelled
    "dailyChecks": 0,
    "lastCheckDate": "2024-01-01"
  }
}
```

### User Profile

**GET** `/api/user`

Get current user information and usage statistics.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "email": "user@example.com",
  "tier": "free",
  "paymentStatus": "active",
  "dailyChecks": 3,
  "lastCheckDate": "2024-01-01",
  "memberSince": "2024-01-01T12:00:00.000Z"
}
```

### Password Breach Check

**GET** `/api/check?hash=<sha1-hash>`

Check if a password hash has been found in data breaches.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `hash` (required): SHA-1 hash of password (40 characters)

**Rate Limits**:
- Free users: 5 checks per day
- PRO users: Unlimited

**Response**:
```json
{
  "isBreached": true,
  "breachCount": 12345,
  "riskLevel": "High", // Low|Medium|High|Critical
  "remainingChecks": 2 // Only for free users
}
```

**Error Responses**:
```json
// Rate limit exceeded
{
  "error": "Rate limit exceeded",
  "reason": "Daily limit reached for free users",
  "resetTime": 1672531200000,
  "remaining": 0
}
```

### Add Password to Monitoring (PRO Only)

**POST** `/api/monitor`

Add a password hash to continuous monitoring.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "passwordHash": "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8",
  "label": "Main Email Password" // Optional
}
```

**Response**:
```json
{
  "success": true,
  "monitoringId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Get Monitored Passwords (PRO Only)

**GET** `/api/monitored`

Get list of passwords being monitored.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "monitoredPasswords": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "passwordHash": "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8",
      "passwordLabel": "Main Email Password",
      "breachCountLastCheck": 12345,
      "createdAt": "2024-01-01T12:00:00.000Z",
      "lastChecked": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### Remove Password from Monitoring

**DELETE** `/api/monitor/<monitoring-id>`

Stop monitoring a specific password.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true
}
```

### PRO Activation (Temporary)

**POST** `/api/activate-pro`

Activate PRO features for a user. This is a temporary endpoint that will be replaced with proper payment verification.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "PRO features activated successfully"
}
```

## Webhook Endpoints

### Stripe Webhook

**POST** `/api/webhooks/stripe`

Receives Stripe payment confirmations.

**Headers**: `stripe-signature: <signature>`

**Events Handled**:
- `checkout.session.completed`
- `payment_intent.succeeded`

### PayPal Webhook

**POST** `/api/webhooks/paypal`

Receives PayPal payment confirmations.

## Error Codes

- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: PRO subscription required
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## Rate Limiting

### Free Users
- 5 password checks per day
- 30-minute cooldown between checks (frontend only)
- Rate limits reset at midnight UTC

### PRO Users
- Unlimited password checks
- No cooldown periods
- Access to monitoring features

## Security

### Password Handling
- Passwords are SHA-1 hashed client-side before transmission
- k-anonymity is used with HaveIBeenPwned API
- No plaintext passwords are ever stored or transmitted

### Authentication
- JWT tokens expire after 24 hours
- Tokens are signed with HS256 algorithm
- User sessions are stateless

### Data Protection
- All API requests are logged for monitoring
- Personal data is encrypted at rest
- Database connections use SSL

## Usage Examples

### Bash/cURL

```bash
# Authenticate
TOKEN=$(curl -s -X POST https://api.example.com/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}' | jq -r .token)

# Check password (SHA-1 of "password")
curl https://api.example.com/api/check?hash=5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8 \
  -H "Authorization: Bearer $TOKEN"
```

### JavaScript/Fetch

```javascript
// Authenticate
const authResponse = await fetch('/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
const { token } = await authResponse.json();

// Check password
const checkResponse = await fetch('/api/check?hash=ABC123...', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const result = await checkResponse.json();
```

### Python/Requests

```python
import requests
import hashlib

# Authenticate
auth_response = requests.post('/api/auth', 
  json={'email': 'user@example.com'})
token = auth_response.json()['token']

# Hash password
password_hash = hashlib.sha1('password'.encode()).hexdigest().upper()

# Check password
check_response = requests.get(f'/api/check?hash={password_hash}',
  headers={'Authorization': f'Bearer {token}'})
result = check_response.json()
```

## Development

### Local Testing

```bash
# Start development server
cd workers
npm run dev

# Run API tests
npm test

# View logs
npm run logs
```

### Environment Variables

Required secrets (set with `wrangler secret put`):
- `NEON_DB_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing key (64+ characters)
- `STRIPE_SECRET_KEY`: Stripe API key (optional)
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret (optional)

### Database Schema

See `../database/schema.sql` for complete table definitions.

Key tables:
- `users`: User accounts and tiers
- `password_checks`: Password check history
- `monitored_passwords`: PRO user monitoring
- `payment_transactions`: Payment tracking
- `api_usage`: Request logging

---

## Support

For API issues or questions:
- Email: api-support@denti.systems
- Documentation: [API Docs](https://docs.denti.systems/api)
- Status: [Status Page](https://status.denti.systems)
