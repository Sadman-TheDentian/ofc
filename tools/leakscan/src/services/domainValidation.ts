
interface DomainValidationResult {
  isValid: boolean;
  exists: boolean;
  isReachable: boolean;
  error?: string;
  details: {
    formatValid: boolean;
    dnsResolved: boolean;
    httpAccessible: boolean;
    httpsAccessible: boolean;
  };
}

export const validateDomain = async (domain: string): Promise<DomainValidationResult> => {
  const result: DomainValidationResult = {
    isValid: false,
    exists: false,
    isReachable: false,
    details: {
      formatValid: false,
      dnsResolved: false,
      httpAccessible: false,
      httpsAccessible: false
    }
  };

  // Step 1: Format validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  result.details.formatValid = domainRegex.test(domain);
  
  if (!result.details.formatValid) {
    result.error = 'Invalid domain format';
    return result;
  }

  try {
    // Step 2: DNS Resolution Check using DNS-over-HTTPS
    const dnsResponse = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { 'Accept': 'application/dns-json' }
    });
    
    if (dnsResponse.ok) {
      const dnsData = await dnsResponse.json();
      result.details.dnsResolved = dnsData.Answer && dnsData.Answer.length > 0;
    }

    if (!result.details.dnsResolved) {
      // Try Google DNS as fallback
      const googleDnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      if (googleDnsResponse.ok) {
        const googleDnsData = await googleDnsResponse.json();
        result.details.dnsResolved = googleDnsData.Answer && googleDnsData.Answer.length > 0;
      }
    }

    if (!result.details.dnsResolved) {
      result.error = 'Domain does not exist or cannot be resolved';
      return result;
    }

    result.exists = true;

    // Step 3: HTTP/HTTPS Connectivity Check
    try {
      const httpsController = new AbortController();
      const httpsTimeout = setTimeout(() => httpsController.abort(), 5000);
      
      const httpsResponse = await fetch(`https://${domain}`, { 
        method: 'HEAD',
        signal: httpsController.signal,
        mode: 'no-cors' // Avoid CORS issues for connectivity check
      });
      
      clearTimeout(httpsTimeout);
      result.details.httpsAccessible = true;
      result.isReachable = true;
    } catch (httpsError) {
      // Try HTTP if HTTPS fails
      try {
        const httpController = new AbortController();
        const httpTimeout = setTimeout(() => httpController.abort(), 5000);
        
        const httpResponse = await fetch(`http://${domain}`, { 
          method: 'HEAD',
          signal: httpController.signal,
          mode: 'no-cors'
        });
        
        clearTimeout(httpTimeout);
        result.details.httpAccessible = true;
        result.isReachable = true;
      } catch (httpError) {
        console.log('Domain exists in DNS but is not reachable via HTTP/HTTPS');
      }
    }

    result.isValid = result.details.formatValid && result.details.dnsResolved;
    
    return result;

  } catch (error) {
    console.error('Domain validation error:', error);
    result.error = 'Unable to validate domain connectivity';
    return result;
  }
};

export const performQuickDomainCheck = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { 'Accept': 'application/dns-json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.Answer && data.Answer.length > 0;
    }
    return false;
  } catch {
    return false;
  }
};
