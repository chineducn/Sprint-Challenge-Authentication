const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig');

beforeEach(() => {
  return db('users').truncate();
});

describe('POST /register', () => {
    it('returns status of 201', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'mike',
                password: '1234'
            });           
        expect(res.status).toBe(201)            
    })

    it('returns new user', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'mike',
                password: '1234'
            });
        
        expect(res.type).toBe('application/json')
        expect(res.body).toEqual({id: 1, username: 'mike'})
    })
})