const db = require('../database/dbConfig')

module.exports = {
    addUser,
    findByUsername,
}

function addUser(userDetails) {
 return db('users').insert(userDetails)
}

function findByUsername(username) {

}