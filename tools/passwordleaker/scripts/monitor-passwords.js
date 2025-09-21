
const { Client } = require('pg');
const fetch = require('node-fetch');

// Environment variables
const DB_URL = process.env.DB_URL;
const EMAIL_SERVICE_ID = process.env.EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;

if (!DB_URL || !EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_API_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Database client
const client = new Client({
  connectionString: DB_URL,
  ssl: { rejectUnauthorized: false }
});

// Sleep function for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Check password against HIBP API using k-anonymity
async function checkPasswordBreach(passwordHash) {
  try {
    const prefix = passwordHash.substring(0, 5);
    const suffix = passwordHash.substring(5).toUpperCase();
    
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'Password-Leaker-Pro-Monitor/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HIBP API error: ${response.status}`);
    }
    
    const data = await response.text();
    const lines = data.split('\n');
    
    for (const line of lines) {
      const [hashSuffix, count] = line.trim().split(':');
      if (hashSuffix === suffix) {
        return parseInt(count, 10);
      }
    }
    
    return 0;
  } catch (error) {
    console.error('Error checking password breach:', error);
    throw error;
  }
}

// Send email alert using EmailJS
async function sendBreachAlert(userEmail, passwordLabel, oldCount, newCount) {
  try {
    const breachIncrease = newCount - oldCount;
    
    let riskLevel = 'Low';
    if (newCount > 100000) riskLevel = 'Critical';
    else if (newCount > 10000) riskLevel = 'High';
    else if (newCount > 100) riskLevel = 'Medium';
    
    const emailData = {
      service_id: EMAIL_SERVICE_ID,
      template_id: EMAIL_TEMPLATE_ID,
      user_id: EMAIL_API_KEY,
      template_params: {
        to_email: userEmail,
        to_name: userEmail.split('@')[0],
        password_label: passwordLabel || 'Monitored Password',
        old_breach_count: oldCount,
        new_breach_count: newCount,
        breach_increase: breachIncrease,
        risk_level: riskLevel,
        dashboard_url: 'https://passwordleaker.denti.systems/dashboard',
        current_date: new Date().toLocaleDateString()
      }
    };
    
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.status}`);
    }
    
    console.log(`✅ Breach alert sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending email alert:', error);
    return false;
  }
}

// Main monitoring function
async function monitorPasswords() {
  try {
    console.log('🔍 Starting password monitoring job...');
    
    await client.connect();
    console.log('📊 Connected to database');
    
    // Get all monitored passwords
    const result = await client.query(`
      SELECT 
        mp.id,
        mp.user_email,
        mp.password_hash,
        mp.password_label,
        mp.breach_count_last_check,
        u.tier
      FROM monitored_passwords mp
      JOIN users u ON mp.user_email = u.email
      WHERE mp.is_active = true
      AND u.tier = 'pro'
      ORDER BY mp.last_checked ASC
    `);
    
    const monitoredPasswords = result.rows;
    console.log(`📋 Found ${monitoredPasswords.length} passwords to monitor`);
    
    if (monitoredPasswords.length === 0) {
      console.log('✅ No passwords to monitor');
      return;
    }
    
    let alertsSent = 0;
    let errorsCount = 0;
    
    for (const password of monitoredPasswords) {
      try {
        console.log(`🔍 Checking password for ${password.user_email}...`);
        
        // Check current breach count
        const currentBreachCount = await checkPasswordBreach(password.password_hash);
        
        // Update last checked timestamp
        await client.query(`
          UPDATE monitored_passwords 
          SET last_checked = NOW(), breach_count_last_check = $1
          WHERE id = $2
        `, [currentBreachCount, password.id]);
        
        // Check if breach count increased
        if (currentBreachCount > password.breach_count_last_check) {
          console.log(`🚨 Breach count increased for ${password.user_email}: ${password.breach_count_last_check} → ${currentBreachCount}`);
          
          // Send alert email
          const emailSent = await sendBreachAlert(
            password.user_email,
            password.password_label,
            password.breach_count_last_check,
            currentBreachCount
          );
          
          // Log breach alert
          await client.query(`
            INSERT INTO breach_alerts (monitored_password_id, old_breach_count, new_breach_count, email_sent)
            VALUES ($1, $2, $3, $4)
          `, [password.id, password.breach_count_last_check, currentBreachCount, emailSent]);
          
          if (emailSent) {
            alertsSent++;
          }
        } else {
          console.log(`✅ No new breaches for ${password.user_email}`);
        }
        
        // Rate limiting: 1.6 seconds between requests (HIBP requirement)
        await sleep(1600);
        
      } catch (error) {
        console.error(`❌ Error processing password for ${password.user_email}:`, error);
        errorsCount++;
      }
    }
    
    console.log('📊 Monitoring job completed:');
    console.log(`   • Passwords checked: ${monitoredPasswords.length}`);
    console.log(`   • Alerts sent: ${alertsSent}`);
    console.log(`   • Errors: ${errorsCount}`);
    
  } catch (error) {
    console.error('💥 Monitoring job failed:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

// Run the monitoring job
if (require.main === module) {
  monitorPasswords()
    .then(() => {
      console.log('✅ Monitoring job finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Monitoring job failed:', error);
      process.exit(1);
    });
}

module.exports = { monitorPasswords };
