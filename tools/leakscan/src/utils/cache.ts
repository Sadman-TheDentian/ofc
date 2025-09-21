
interface CacheItem {
  data: any;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class Cache {
  private cache = new Map<string, CacheItem>();

  set(key: string, data: any, ttlMinutes: number = 30) {
    const ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem(`leakscan_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        ttl
      }));
    } catch (error) {
      console.warn('Failed to store cache in localStorage:', error);
    }
  }

  get(key: string): any | null {
    // Try memory cache first
    let item = this.cache.get(key);
    
    // If not in memory, try localStorage
    if (!item) {
      try {
        const stored = localStorage.getItem(`leakscan_cache_${key}`);
        if (stored) {
          item = JSON.parse(stored);
          if (item) {
            this.cache.set(key, item);
          }
        }
      } catch (error) {
        console.warn('Failed to read cache from localStorage:', error);
      }
    }
    
    if (!item) return null;
    
    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      try {
        localStorage.removeItem(`leakscan_cache_${key}`);
      } catch (error) {
        console.warn('Failed to remove expired cache:', error);
      }
      return null;
    }
    
    return item.data;
  }

  clear() {
    this.cache.clear();
    // Clear localStorage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('leakscan_cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }
}

export const scanCache = new Cache();
