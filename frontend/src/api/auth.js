import { apiFetch, BASE_URL } from '../lib/api.js';

export const authApi = {
  login: (credentials) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  signup: (userData) => apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  getMe: () => apiFetch('/auth/me', {
    method: 'GET'
  }),
  getGoogleAuthUrl: () => `${BASE_URL}/auth/google`,
  getGithubAuthUrl: () => `${BASE_URL}/auth/github`
};
