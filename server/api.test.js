const request = require('supertest');
const app = require('./index'); // Make sure your index.js exports 'app'

describe('Solana Ops Suite API', () => {
  
  it('should return a 404 for undefined routes', async () => {
    const res = await request(app).get('/api/nonsense-route');
    expect(res.statusCode).toBe(404);
  });

  // Replace '/api/audit' with whatever your actual route is named in index.js
  it('should block audit requests missing a target IP', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({}); // Sending an empty body to trigger validation error
    
    // Assuming your API sends a 400 Bad Request when data is missing
    expect(res.statusCode).toBe(400); 
  });
});