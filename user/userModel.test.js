const User = require('./userModel')
const db = require('../database/dbConfig')

describe('user model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('add user', () => {
        it('adds a user', async () => {
            const newUser = { username: 'Mike', password: '1234' }
            await User.addUser(newUser)
            const users = await db('users')

            expect(users.length).toBe(1);
            expect(users[0].username).toBe('Mike')
        })

        
    })
})

