// --- SISTEMA DE CACHÉ (LocalStorage) para baja conectividad ---
function cacheData(key, data, ttlMinutes = 30) {
  const item = { data, expiry: Date.now() + ttlMinutes * 60000 };
  localStorage.setItem(key, JSON.stringify(item));
}

function getCachedData(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data;
}

// --- RATE LIMITING (Cliente) ---
// Protege la UI y reduce peticiones innecesarias al servidor
class RateLimiter {
  constructor() {
    this.requests = {};
  }
  checkLimit(action, limit = 10, windowMs = 60000) {
    const now = Date.now();
    if (!this.requests[action]) this.requests[action] = [];
    this.requests[action] = this.requests[action].filter(t => now - t < windowMs);
    if (this.requests[action].length >= limit) {
      throw new Error('Demasiadas peticiones. Espera un momento.');
    }
    this.requests[action].push(now);
    return true;
  }
}
const rateLimiter = new RateLimiter();

// --- UTILIDADES UI ---
function showNotification(msg, type = 'info') {
  const colors = { info: 'bg-blue-500', success: 'bg-green-500', error: 'bg-red-500' };
  const div = document.createElement('div');
  div.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.style.opacity = '0', 3000);
  setTimeout(() => div.remove(), 3500);
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CU', { style: 'currency', currency: 'CUP' }).format(price);
}