import express from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/response.js';

const router = express.Router();

// --- Validation Schemas ---
const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
  })
});

// --- Helper Functions ---
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

// --- Email/Password Auth ---
router.post('/signup', validate(signupSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendError(res, 400, 'USER_EXISTS', 'Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash }
    });

    const token = generateToken(user.id);
    const userData = { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
    
    return sendSuccess(res, 'User registered successfully', { user: userData, token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const token = generateToken(user.id);
    const userData = { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
    
    return sendSuccess(res, 'Login successful', { user: userData, token });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) {
      return sendError(res, 404, 'USER_NOT_FOUND', 'User not found');
    }
    const userData = { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
    return sendSuccess(res, 'User retrieved', { user: userData });
  } catch (error) {
    next(error);
  }
});

// --- Google OAuth ---
router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;
  if (!clientId || !redirectUri) return sendError(res, 500, 'SERVER_ERROR', 'Google OAuth not configured');
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`;
  res.redirect(authUrl);
});

router.get('/google/callback', async (req, res, next) => {
  const { code } = req.query;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  if (!code) return res.redirect(`${frontendUrl}/login?error=oauth_failed`);

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' })
    });
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) throw new Error('Failed to get access token');

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const googleUser = await userResponse.json();

    if (!googleUser.email) throw new Error('No email returned from Google');

    let user = await prisma.user.findUnique({ where: { email: googleUser.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name || 'Google User',
          avatarUrl: googleUser.picture,
          accounts: {
            create: { provider: 'google', providerAccountId: googleUser.id }
          }
        }
      });
    } else {
      const account = await prisma.account.findUnique({ where: { provider_providerAccountId: { provider: 'google', providerAccountId: googleUser.id } } });
      if (!account) {
        await prisma.account.create({ data: { userId: user.id, provider: 'google', providerAccountId: googleUser.id } });
      }
    }

    const token = generateToken(user.id);
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
});

// --- GitHub OAuth ---
router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  if (!clientId || !redirectUri) return sendError(res, 500, 'SERVER_ERROR', 'GitHub OAuth not configured');

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
  res.redirect(authUrl);
});

router.get('/github/callback', async (req, res, next) => {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  if (!code) return res.redirect(`${frontendUrl}/login?error=oauth_failed`);

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
    });
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) throw new Error('Failed to get access token');

    const userResponse = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/json' }
    });
    const githubUser = await userResponse.json();

    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/json' }
    });
    const emails = await emailsResponse.json();
    const primaryEmail = emails.find(e => e.primary)?.email || emails[0]?.email;

    if (!primaryEmail) throw new Error('No email returned from GitHub');

    let user = await prisma.user.findUnique({ where: { email: primaryEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: primaryEmail,
          name: githubUser.name || githubUser.login,
          avatarUrl: githubUser.avatar_url,
          accounts: {
            create: { provider: 'github', providerAccountId: String(githubUser.id) }
          }
        }
      });
    } else {
      const account = await prisma.account.findUnique({ where: { provider_providerAccountId: { provider: 'github', providerAccountId: String(githubUser.id) } } });
      if (!account) {
        await prisma.account.create({ data: { userId: user.id, provider: 'github', providerAccountId: String(githubUser.id) } });
      }
    }

    const token = generateToken(user.id);
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
});

export default router;
