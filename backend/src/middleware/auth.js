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
    req.admin = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
};
