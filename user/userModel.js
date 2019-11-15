const db = require('../database/dbConfig')

module.exports = {
    addUser,
    findByUsername,
}

function addUser(userDetails) {
    return db('users')
        .insert(userDetails)
        .then(idArray => {
            return db('users')
                .where({ id: idArray[0] })
                .select('id', 'username')
                .first()
        })
}

function findByUsername(username) {
    return db('users')
        .where({ username })
        .first()
}