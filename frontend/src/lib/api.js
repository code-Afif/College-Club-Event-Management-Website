export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * @param {string} endpoint 
 * @param {RequestInit} [options] 
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('token');
  const token = adminToken || userToken; // Prefer admin token if both exist, or decide based on endpoint? Actually, just pass whatever is available. If both, pass adminToken or let specific hooks handle it. Let's pass adminToken if endpoint starts with /admin, else userToken.
  
  let authHeader = '';
  if (endpoint.startsWith('/admin') && adminToken) {
    authHeader = `Bearer ${adminToken}`;
  } else if (userToken) {
    authHeader = `Bearer ${userToken}`;
  } else if (adminToken) {
    authHeader = `Bearer ${adminToken}`;
  }
  
  const headers = {
    'Content-Type': 'application/json',
    ...(authHeader ? { 'Authorization': authHeader } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Export CSV case
  if (endpoint.includes('/export')) {
    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  const json = await response.json();

  if (!json.success) {
    const error = new Error(json.message);
    error.code = json.error?.code;
    error.details = json.error?.details;
    throw error;
  }

  // If there's meta, we might want to return it along with data.
  // For simplicity, we can return an object containing both if meta exists, 
  // or just data. Let's return { data, meta } if meta exists, else data.
  if (json.meta) {
    return { data: json.data, meta: json.meta };
  }

  return json.data;
}
