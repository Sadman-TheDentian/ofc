# Password Leaker PRO - Complete Deployment Guide

## 🚀 Quick Start

This guide will help you deploy the complete Password Leaker PRO system with all features working.

## 📋 Prerequisites

- GitHub account with Actions enabled
- Cloudflare account with Workers plan (free tier works)
- NeonDB PostgreSQL database (free tier available)
- EmailJS account (free tier available)
- Domain for frontend (optional, Vercel provides free subdomain)

## 🔧 Environment Variables

### Required Secrets for GitHub Actions
Add these in your GitHub repository: Settings → Secrets and Variables → Actions

```bash
DB_URL=postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require
EMAIL_SERVICE_ID=service_xxxxx
EMAIL_TEMPLATE_ID=template_xxxxx  
EMAIL_API_KEY=xxxxx
```

### Required for Cloudflare Worker
Set these in Cloudflare Workers dashboard:

```bash
NEON_DB_URL=postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
```

### Required for Frontend (.env)
Create `.env` file in project root:

```bash
VITE_API_BASE_URL=https://your-worker.your-subdomain.workers.dev
VITE_APP_NAME=Password Leaker PRO
VITE_BRAND_COLOR=#00FF66
```

## 🗄️ Database Setup (NeonDB)

### 1. Create NeonDB Account
1. Go to [neon.tech](https://neon.tech) and create free account
2. Create new project: "password-leaker-pro"
3. Note down connection string

### 2. Initialize Database Schema
```bash
# Connect via psql (or use NeonDB SQL Editor)
psql "postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"

# Run the schema from database/schema.sql
\i database/schema.sql
```

### 3. Verify Tables Created
```sql
-- Check tables exist
\dt

-- Verify admin user created
SELECT * FROM users WHERE email = 'admin@denti.systems';
```

## ☁️ Cloudflare Worker Deployment

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

### 2. Setup Worker Project
```bash
# Create new worker
mkdir password-leaker-api && cd password-leaker-api
wrangler init

# Replace src/index.js with workers/api.js content
cp ../workers/api.js src/index.js
```

### 3. Configure wrangler.toml
```toml
name = "password-leaker-api"
main = "src/index.js"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
# Public variables can go here

[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-id"
```

### 4. Set Secrets
```bash
# Set environment variables as secrets
wrangler secret put NEON_DB_URL
wrangler secret put JWT_SECRET
```

### 5. Deploy Worker
```bash
# Deploy to production
wrangler deploy

# Note the deployed URL: https://password-leaker-api.your-subdomain.workers.dev
```

## 📧 EmailJS Setup

### 1. Create EmailJS Account
1. Go to [emailjs.com](https://emailjs.com) and create account
2. Create email service (use Gmail, Outlook, or Zoho)
3. Create email template for breach alerts

### 2. Template Configuration
Create template with ID `template_v8wiz19`:

**Subject:** `🚨 Security Alert: Password Breach Detected`

**Content:**
```html
Hello {{to_name}},

We've detected that your monitored password "{{password_label}}" has appeared in additional data breaches.

Previous breach count: {{old_breach_count}}
Current breach count: {{new_breach_count}}
New breaches found: {{breach_increase}}

Risk Level: {{risk_level}}

We recommend changing this password immediately on all accounts where it's used.

View your dashboard: {{dashboard_url}}

Best regards,
Password Leaker PRO Team
DentiSystems

This alert was sent on {{current_date}}.
```

### 3. Get Service Details
- Service ID: Found in EmailJS dashboard
- Template ID: The template you created
- User ID: Your EmailJS user ID from account settings

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Environment
```bash
# Create .env file with your values
cp .env.example .env

# Update VITE_API_BASE_URL with your worker URL
VITE_API_BASE_URL=https://password-leaker-api.your-subdomain.workers.dev
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

### 3. Alternative: Manual Deploy
1. Build the project: `npm run build`
2. Upload `dist` folder to any static hosting
3. Configure environment variables in hosting platform

## ⚙️ GitHub Actions Setup

### 1. Verify Workflow File
The workflow in `.github/workflows/monitoring.yml` should be already configured.

### 2. Add Required Secrets
In GitHub repository settings, add:
- `DB_URL`: Your NeonDB connection string
- `EMAIL_SERVICE_ID`: EmailJS service ID
- `EMAIL_TEMPLATE_ID`: EmailJS template ID  
- `EMAIL_API_KEY`: EmailJS user ID

### 3. Test Workflow
- Go to Actions tab in GitHub
- Click "Password Monitoring System"
- Click "Run workflow" to test manually

## 🔍 Testing the Complete System

### 1. Test Frontend Connection
```bash
# Check API health endpoint
curl https://your-worker.your-subdomain.workers.dev/api/health
```

### 2. Test Authentication
1. Go to your deployed frontend
2. Click "Login"
3. Enter any email address
4. Enter payment code longer than 10 characters for PRO

### 3. Test Password Checking
1. Try password "123456" (known breached)
2. Verify rate limiting works for free users
3. Verify unlimited for PRO users

### 4. Test PRO Features (PRO users only)
1. Go to Dashboard
2. Add password to monitoring
3. Check database to verify storage

### 5. Test Monitoring Job
1. Add a known breached password to monitoring
2. Trigger GitHub Action manually
3. Check for email alerts

## 📊 System Monitoring

### Health Checks
- Frontend: Check if site loads
- Backend: GET `/api/health`
- Database: Check connection in NeonDB dashboard
- Email: Check EmailJS dashboard for delivery stats

### Logs and Debugging
- **Cloudflare Worker**: Real-time logs in CF dashboard
- **GitHub Actions**: Check workflow execution history  
- **Frontend**: Browser developer tools console
- **Database**: Query logs in NeonDB dashboard

## 🔒 Security Configuration

### 1. CORS Setup
The Worker automatically handles CORS for all origins. For production, update to specific domains:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://passwordleaker.denti.systems',
  // ... other headers
};
```

### 2. Rate Limiting
- Free users: 5 checks/day, 30-minute cooldown
- PRO users: Unlimited
- HIBP API: 1.6 second delay between requests

### 3. Data Security
- Passwords are SHA-1 hashed client-side
- k-anonymity used for HIBP requests
- JWT tokens for API authentication
- Database connections use SSL

## 💰 Cost Estimation

### Free Tier Limits
- **Cloudflare Workers**: 100,000 requests/day
- **NeonDB**: 512MB storage, 10GB transfer
- **EmailJS**: 200 emails/month
- **GitHub Actions**: 2,000 minutes/month
- **Vercel**: Unlimited static hosting

### Scaling Costs
- CF Workers: ~$0.50 per million requests
- NeonDB: Pay-as-you-scale model
- EmailJS: ~$15/month for 10,000 emails
- GitHub Actions: ~$0.008/minute over free tier

## 🚨 Troubleshooting

### Common Issues

**"Failed to fetch" errors**
- Check VITE_API_BASE_URL matches deployed worker URL
- Verify CORS headers in worker
- Check worker deployment status

**Database connection errors**
- Verify NEON_DB_URL format and credentials
- Check if database schema was initialized
- Ensure SSL connection is enabled

**Email delivery failures**
- Check EmailJS service status and quotas
- Verify template ID exists
- Check SMTP credentials in EmailJS

**Authentication problems**
- Verify JWT_SECRET is set in worker
- Check token expiration logic
- Clear localStorage and retry

### Getting Help
1. Check logs in respective platforms
2. Verify all environment variables are set
3. Test each component individually
4. Contact support: [denti.systems](https://denti.systems)

## 🎯 Production Checklist

- [ ] Database schema initialized
- [ ] Cloudflare Worker deployed with secrets
- [ ] EmailJS template configured  
- [ ] Frontend deployed with correct API URL
- [ ] GitHub Actions secrets configured
- [ ] Test authentication flow
- [ ] Test password checking
- [ ] Test PRO features
- [ ] Test monitoring job
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring alerts
- [ ] Review security settings

## 📈 Post-Deployment

### 1. Monitor Usage
- Track user registrations
- Monitor API request volumes
- Watch email delivery rates
- Check GitHub Actions execution

### 2. Performance Optimization
- Implement Redis caching for frequent requests
- Optimize database queries
- Set up CDN for frontend assets
- Monitor response times

### 3. Feature Enhancements
- Add CSV upload for bulk monitoring
- Implement breach source details
- Add password strength analysis
- Create admin dashboard
- Integrate with more data sources

---

## 🏆 Success!

Your Password Leaker PRO system is now fully deployed and operational!

- **Frontend**: User-friendly interface with auth and monitoring
- **Backend**: Scalable API with rate limiting and security
- **Database**: Secure storage with proper indexing
- **Monitoring**: Automated daily breach checking
- **Alerts**: Real-time email notifications
- **PRO Features**: Full subscription management

The system is production-ready and can handle real users with proper security, scaling, and monitoring in place.

For support or questions, contact: **hello@denti.systems**
