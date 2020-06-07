const request = require('supertest');
const { validateToken, generateAuthToken } = require('../src/utils/jwt');
const app = require('../src/app');
const { v4: uuidv4 } = require('uuid');
const longExpire = '1 hour';
const immediateExpire = '0 seconds';

test('Should generate a valid JWT token', async () => {
  const token = await createAndReturnToken(longExpire);
  expect(token).not.toBeNull();
  const decoded = await validateToken(token);
  expect(decoded).not.toBeNull();
});

test('Should fail token validation when expired', async () => {
  const token = await createAndReturnToken(immediateExpire);
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

test('Should not be able to invoke protected endpoint without a token', async () => {
  await request(app).get('/test/secure').send().expect(401);
});

test('Should be able to invoke a secure endpoint with a token', async () => {
  const token = await createAndReturnToken(longExpire);
  expect(token).not.toBeNull();
  await request(app)
    .get('/test/secure')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);
});

async function createAndReturnToken(expiresIn) {
  const id = uuidv4();
  expect(id).not.toBeNull();
  const token = await generateAuthToken({ id, expiresIn });
  return token;
}
