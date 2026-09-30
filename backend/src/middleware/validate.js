import { z } from 'zod';
import { sendError } from '../utils/response.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Attach validated and parsed data to request object
    if (parsed.body !== undefined) req.body = parsed.body;
    if (parsed.query !== undefined) Object.assign(req.query, parsed.query);
    if (parsed.params !== undefined) Object.assign(req.params, parsed.params);
    
    next();
  } catch (error) {
    next(error); // Pass ZodError to global error handler
  }
};
