import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';

export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Authentication token missing or invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    const decoded = jwt.verify(token, secret);
    
    // Ensure this token belongs to the admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return sendError(res, 403, 'FORBIDDEN', 'Access denied. Admin only.');
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
};

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Authentication token missing or invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    const decoded = jwt.verify(token, secret);
    
    // Ensure this is a regular user token
    if (!decoded.userId) {
      return sendError(res, 403, 'FORBIDDEN', 'Access denied.');
    }

    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
};
