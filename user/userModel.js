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
                .first()
        })
}

function findByUsername(username) {

}