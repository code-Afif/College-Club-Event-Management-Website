import express from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { validate } from '../middleware/validate.js';
import { sendSuccess, sendError } from '../utils/response.js';

const router = express.Router();

router.get('/club', (req, res) => {
  const clubInfo = {
    name: 'Tech & Code Club',
    tagline: 'Build the future, together.',
    about: 'We are a community of passionate student developers building real-world projects and learning modern tech stacks.',
    socials: {
      github: 'https://github.com/techcodeclub',
      instagram: 'https://instagram.com/techcodeclub'
    }
  };
  return sendSuccess(res, 'Club info retrieved', clubInfo);
});

router.get('/categories', async (req, res) => {
  const categories = await prisma.event.findMany({
    select: { category: true },
    distinct: ['category']
  });
  return sendSuccess(res, 'Categories retrieved', categories.map(c => c.category));
});

router.get('/events/featured', async (req, res, next) => {
  try {
    const event = await prisma.event.findFirst({
      where: { isFeatured: true },
      orderBy: { startsAt: 'asc' }
    });
    return sendSuccess(res, 'Featured event retrieved', event);
  } catch (error) {
    next(error);
  }
});

const getEventsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    upcoming: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
  })
});

router.get('/events', validate(getEventsSchema), async (req, res, next) => {
  try {
    const { search, category, upcoming, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (search) {
      where.name = { contains: search };
    }
    if (category) {
      where.category = category;
    }
    if (upcoming === 'true') {
      where.startsAt = { gte: new Date() };
    }

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;

    const total = await prisma.event.count({ where });
    const events = await prisma.event.findMany({
      where,
      orderBy: { startsAt: 'asc' },
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
    });

    const meta = {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit)
    };

    return sendSuccess(res, 'Events retrieved', events, meta);
  } catch (error) {
    next(error);
  }
});

router.get('/events/:id', async (req, res, next) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id }
    });
    
    if (!event) {
      return sendError(res, 404, 'EVENT_NOT_FOUND', 'Event not found');
    }
    return sendSuccess(res, 'Event retrieved', event);
  } catch (error) {
    next(error);
  }
});

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    collegeYear: z.string().min(1, "College/Year is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  })
});

router.post('/events/:id/register', validate(registerSchema), async (req, res, next) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id }
    });
    
    if (!event) {
      return sendError(res, 404, 'EVENT_NOT_FOUND', 'Event not found');
    }

    const registration = await prisma.registration.create({
      data: {
        ...req.body,
        eventId: req.params.id
      }
    });

    return sendSuccess(res, 'Successfully registered for event', registration);
  } catch (error) {
    next(error);
  }
});

export default router;
