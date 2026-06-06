const normalizeApiUrl = (url) => url.replace(/\/+$/, '');
const isPlaceholderApiUrl = (url = '') =>
  url.includes('your-divina-server') || url.includes('<your-real-server-project>');

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const fallbackApiUrl = import.meta.env.DEV ? 'http://localhost:8000/api' : '/api';
const apiUrl = configuredApiUrl && !isPlaceholderApiUrl(configuredApiUrl) ? configuredApiUrl : fallbackApiUrl;

const HOST = normalizeApiUrl(apiUrl);

if (import.meta.env.PROD && !configuredApiUrl) {
  // Production deployments need VITE_API_URL to point at the deployed API.
  console.warn('VITE_API_URL is not configured. API requests will use /api.');
}

if (import.meta.env.PROD && isPlaceholderApiUrl(configuredApiUrl)) {
  console.error('VITE_API_URL is still using the placeholder server URL. Set it to the real deployed API URL.');
}

export default {
  HOST,
};
