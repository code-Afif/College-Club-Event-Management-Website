export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * @param {string} endpoint 
 * @param {RequestInit} [options] 
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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
