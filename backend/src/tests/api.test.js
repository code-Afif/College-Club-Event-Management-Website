import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { prisma } from '../db.js';

let server;
let adminToken = '';

beforeAll(async () => {
  server = app.listen(0); // arbitrary port
  // Clean db
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  // Get admin token
  const res = await request(server).post('/api/admin/login').send({
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: 'testpassword'
  });
  adminToken = res.body.data.token;
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

describe('College Club Events API', () => {
  let testEventId = '';

  it('should authenticate admin', async () => {
    const res = await request(server)
      .post('/api/admin/login')
      .send({ email: process.env.ADMIN_EMAIL || 'admin@example.com', password: 'testpassword' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  it('should prevent access to admin routes without token', async () => {
    const res = await request(server).post('/api/admin/events').send({});
    expect(res.statusCode).toBe(401);
  });

  it('should allow admin to create an event', async () => {
    const res = await request(server)
      .post('/api/admin/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Event',
        description: 'Test description',
        category: 'Workshop',
        venue: 'Room 101',
        startsAt: new Date(Date.now() + 86400000).toISOString(),
        capacity: 50
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    testEventId = res.body.data.id;
  });

  it('should fetch public events', async () => {
    const res = await request(server).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should register for an event successfully', async () => {
    const res = await request(server)
      .post(`/api/events/${testEventId}/register`)
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        collegeYear: 'CS 3rd Year',
        phone: '1234567890'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should fail registration validation for invalid email', async () => {
    const res = await request(server)
      .post(`/api/events/${testEventId}/register`)
      .send({
        name: 'John Doe',
        email: 'not-an-email',
        collegeYear: 'CS 3rd Year',
        phone: '1234567890'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should prevent duplicate registration', async () => {
    const res = await request(server)
      .post(`/api/events/${testEventId}/register`)
      .send({
        name: 'John Doe Duplicate',
        email: 'john@example.com',
        collegeYear: 'CS 3rd Year',
        phone: '1234567890'
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.error.code).toBe('ALREADY_REGISTERED');
  });

  it('should allow admin to delete an event', async () => {
    const res = await request(server)
      .delete(`/api/admin/events/${testEventId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    
    // Verify it's gone
    const checkRes = await request(server).get(`/api/events/${testEventId}`);
    expect(checkRes.statusCode).toBe(404);
  });
});
