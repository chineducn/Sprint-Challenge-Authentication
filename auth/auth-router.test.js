const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig');
const User = require('./auth-router')

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

describe('POST /login', () => {
    it('returns status of 200', async () => {
        await request(server)
            .post('/api/auth/register')
            .send({
                username: 'mike',
                password: '1234'
            });
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'mike',
                password: '1234'
            });           
        expect(res.status).toBe(200)            
    })

    it('returns a token', async () => {
        await request(server)
            .post('/api/auth/register')
            .send({
                username: 'mike',
                password: '1234'
            });
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'mike',
                password: '1234'
            });
        
        expect(res.body).toHaveProperty('token')
    })
})