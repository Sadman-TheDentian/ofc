-- Password Leak Monitoring System Database Schema
-- Production-Ready PostgreSQL Schema for NeonDB

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with complete user management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'active', 'expired', 'cancelled')),
    daily_checks_used INTEGER DEFAULT 0,
    last_check_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Password checks tracking table
CREATE TABLE password_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    password_hash VARCHAR(40) NOT NULL, -- SHA-1 hash (40 chars)
    is_breached BOOLEAN NOT NULL,
    breach_count INTEGER DEFAULT 0,
    risk_level VARCHAR(20) CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Monitored passwords table
CREATE TABLE monitored_passwords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    password_hash VARCHAR(40) NOT NULL, -- SHA-1 hash (40 chars)
    password_label VARCHAR(100), -- Optional label for the password
    breach_count_last_check INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Payment transactions table with Gumroad license support
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    payment_provider VARCHAR(50) NOT NULL, -- 'gumroad', 'stripe', 'paypal'
    transaction_id VARCHAR(255) NOT NULL,
    amount INTEGER, -- Amount in cents
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL, -- 'pending', 'completed', 'failed', 'refunded'
    webhook_verified BOOLEAN DEFAULT false,
    license_key VARCHAR(255), -- For Gumroad license keys (partial for security)
    purchase_data JSONB, -- Store full purchase data from payment provider
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Breach alerts history
CREATE TABLE breach_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monitored_password_id UUID NOT NULL REFERENCES monitored_passwords(id) ON DELETE CASCADE,
    old_breach_count INTEGER DEFAULT 0,
    new_breach_count INTEGER NOT NULL,
    alert_sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE,
    notification_method VARCHAR(50) DEFAULT 'email'
);

-- API usage tracking for comprehensive monitoring
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    endpoint VARCHAR(100) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rate_limited BOOLEAN DEFAULT FALSE
);

-- Performance optimization indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_users_last_check_date ON users(last_check_date);
CREATE INDEX idx_password_checks_user_id ON password_checks(user_id);
CREATE INDEX idx_password_checks_checked_at ON password_checks(checked_at);
CREATE INDEX idx_monitored_passwords_user_id ON monitored_passwords(user_id);
CREATE INDEX idx_monitored_passwords_active ON monitored_passwords(is_active);
CREATE INDEX idx_monitored_passwords_last_checked ON monitored_passwords(last_checked);
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_provider ON payment_transactions(payment_provider);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_created_at ON payment_transactions(created_at);
CREATE INDEX idx_breach_alerts_monitored_password ON breach_alerts(monitored_password_id);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_timestamp ON api_usage(timestamp);
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user
INSERT INTO users (email, tier, payment_status) VALUES ('admin@denti.systems', 'pro', 'active');

-- Sample data for testing (remove in production)
INSERT INTO users (email, tier, payment_status) VALUES 
    ('test@example.com', 'free', 'active'),
    ('pro@example.com', 'pro', 'active');
