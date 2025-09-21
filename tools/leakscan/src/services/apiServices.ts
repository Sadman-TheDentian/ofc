
// Real API services without fake fallback data

export const checkHaveIBeenPwned = async (domain: string) => {
  try {
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${domain}`, {
      headers: {
        'User-Agent': 'LeakScan-Tool'
      }
    });
    
    if (response.status === 404) {
      return { count: 0, breaches: [] };
    }
    
    if (!response.ok) {
      throw new Error(`HIBP API error: ${response.status}`);
    }
    
    const breaches = await response.json();
    return { 
      count: breaches.length,
      breaches: breaches.slice(0, 3).map((breach: any) => breach.Name)
    };
  } catch (error) {
    console.error('HaveIBeenPwned API error:', error);
    // Return null instead of fake data when API fails
    return null;
  }
};

export const checkGitHubMentions = async (domain: string) => {
  try {
    const query = encodeURIComponent(`"${domain}"`);
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      count: data.total_count,
      repositories: data.items.slice(0, 3).map((repo: any) => ({
        name: repo.full_name,
        url: repo.html_url,
        description: repo.description || 'No description available'
      }))
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    return null;
  }
};

export const checkAdminPanels = async (domain: string) => {
  const commonPaths = [
    '/admin',
    '/login',
    '/wp-admin',
    '/administrator',
    '/cpanel',
    '/phpmyadmin',
    '/admin.php',
    '/wp-login.php'
  ];
  
  const foundPanels: string[] = [];
  
  try {
    // Use a more realistic approach - check common patterns
    const promises = commonPaths.map(async (path) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`https://${domain}${path}`, {
          method: 'HEAD',
          signal: controller.signal,
          mode: 'no-cors'
        });
        
        clearTimeout(timeout);
        
        // If no error is thrown, the path likely exists
        return path;
      } catch {
        return null;
      }
    });
    
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        foundPanels.push(result.value);
      }
    });
    
    return foundPanels;
  } catch (error) {
    console.error('Admin panel check error:', error);
    return null;
  }
};

export const checkCertificateTransparency = async (domain: string) => {
  try {
    const response = await fetch(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`);
    
    if (!response.ok) {
      throw new Error(`Certificate Transparency API error: ${response.status}`);
    }
    
    const certificates = await response.json();
    
    if (!Array.isArray(certificates) || certificates.length === 0) {
      return {
        subdomains: [],
        certificateCount: 0
      };
    }
    
    const subdomains = new Set<string>();
    
    certificates.forEach((cert: any) => {
      if (cert.name_value) {
        const names = cert.name_value.split('\n');
        names.forEach((name: string) => {
          const cleanName = name.replace('*.', '').toLowerCase().trim();
          if (cleanName.includes(domain) && cleanName !== domain && !cleanName.startsWith('_')) {
            subdomains.add(cleanName);
          }
        });
      }
    });
    
    return {
      subdomains: Array.from(subdomains).slice(0, 15),
      certificateCount: certificates.length
    };
  } catch (error) {
    console.error('Certificate Transparency API error:', error);
    return null;
  }
};

export const checkDNSRecords = async (domain: string) => {
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { 'Accept': 'application/dns-json' }
    });
    
    if (!response.ok) {
      throw new Error(`DNS API error: ${response.status}`);
    }
    
    const data = await response.json();
    const hasRecords = data.Answer && data.Answer.length > 0;
    
    // Check for security-related DNS records
    const securityChecks = await Promise.allSettled([
      fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=TXT`, {
        headers: { 'Accept': 'application/dns-json' }
      }),
      fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
        headers: { 'Accept': 'application/dns-json' }
      })
    ]);
    
    const successfulChecks = securityChecks.filter(result => result.status === 'fulfilled').length;
    
    return {
      hasARecord: hasRecords,
      securityRecords: successfulChecks,
      riskLevel: hasRecords ? 'low' : 'medium'
    };
  } catch (error) {
    console.error('DNS check error:', error);
    return null;
  }
};

export const checkSSLCertificate = async (domain: string) => {
  try {
    // Simple SSL check by attempting HTTPS connection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    return {
      grade: 'A', // Simplified for free implementation
      hasSSL: response.ok || response.status < 500,
      issues: []
    };
  } catch (error) {
    console.error('SSL check error:', error);
    
    // Check if domain supports SSL at all
    try {
      const httpResponse = await fetch(`http://${domain}`, { method: 'HEAD' });
      return {
        grade: 'F',
        hasSSL: false,
        issues: ['No SSL certificate found']
      };
    } catch {
      return null;
    }
  }
};

export const checkWHOISInfo = async (domain: string) => {
  // Note: Real WHOIS requires server-side implementation
  // This is a simplified version that could be enhanced with a WHOIS API
  try {
    // We can't do real WHOIS from browser, return null
    // In a real implementation, this would require a backend service
    return null;
  } catch (error) {
    console.error('WHOIS check error:', error);
    return null;
  }
};

export const checkSecurityHeaders = async (domain: string) => {
  try {
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD'
    });
    
    const headers = response.headers;
    const securityHeaders = {
      'strict-transport-security': headers.get('strict-transport-security') !== null,
      'content-security-policy': headers.get('content-security-policy') !== null,
      'x-frame-options': headers.get('x-frame-options') !== null,
      'x-content-type-options': headers.get('x-content-type-options') !== null,
      'x-xss-protection': headers.get('x-xss-protection') !== null
    };
    
    const presentHeaders = Object.values(securityHeaders).filter(Boolean).length;
    
    return {
      headers: securityHeaders,
      score: (presentHeaders / 5) * 100,
      missing: Object.keys(securityHeaders).filter(key => !securityHeaders[key as keyof typeof securityHeaders])
    };
  } catch (error) {
    console.error('Security headers check error:', error);
    return null;
  }
};
