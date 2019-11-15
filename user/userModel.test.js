const User = require('./userModel')
const db = require('../database/dbConfig')

describe('user model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('add user', () => {
        it('adds a user', async () => {
            const userDetails = { username: 'Mike', password: '1234' }
            await User.addUser(userDetails)
            const users = await db('users')

            expect(users.length).toBe(1);
            expect(users[0].username).toBe('Mike')
            expect(users[0].password).toBe('1234')
        })

        it('resolves to the new user', async () => {
            const userDetails = { username: 'Mike', password: '1234' }
            const newUser = await User.addUser(userDetails)

            expect(newUser).toEqual({ id: 1, username: 'Mike', password: '1234'})
        })
    })

    describe('search using username', () => {
        it('returns a user using the username', async () => {
            const userDetails = { username: 'Mike', password: '1234' }
            const newUser = await User.addUser(userDetails)
            const foundUser = await User.findByUsername(newUser.username)

            expect(foundUser).toEqual({ id: 1, username: 'Mike', password: '1234'})
        })
    })
})

