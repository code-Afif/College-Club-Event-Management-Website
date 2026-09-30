import { sendError } from '../utils/response.js';
import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    const details = err.errors.reduce((acc, current) => {
      acc[current.path.join('.')] = current.message;
      return acc;
    }, {});
    
    return sendError(res, 400, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  // Handle unique constraint violation (Prisma)
  if (err.code === 'P2002') {
    return sendError(res, 409, 'ALREADY_REGISTERED', 'Unique constraint failed on the fields: ' + err.meta?.target?.join(', '));
  }

  return sendError(res, 500, 'INTERNAL_ERROR', 'An unexpected error occurred');
};
