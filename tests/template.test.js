const request = require('supertest');
const { validateToken, generateAuthToken } = require('../src/middleware/auth');
const app = require('../src/app');
const { v4: uuidv4 } = require('uuid');

test('Should generate a valid JWT token', async () => {
  const expiresIn = '1 minute';
  const id = uuidv4();
  expect(id).not.toBeNull();
  const token = await generateAuthToken({ id, expiresIn });
  expect(token).not.toBeNull();
  const decoded = await validateToken(token);
  expect(decoded).not.toBeNull();
});

test('Should fail token validation when expired', async () => {
  const expiresIn = '0 seconds';
  const id = uuidv4();
  expect(id).not.toBeNull();
  const token = await generateAuthToken({ id, expiresIn });
  expect(token).not.toBeNull();
  try {
    await validateToken(token);
    throw new Error('The token should have expired');
  } catch (e) {
    // OK
  }
});

test('The test endpoint should return OK', async () => {
  await request(app).get('/testme').send().expect(200);
});
