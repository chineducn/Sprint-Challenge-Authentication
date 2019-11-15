const router = require('express').Router();
const generateToken = require('./generateToken')
const bcrypt = require('bcryptjs')
const db = require('../user/userModel')

router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const userDetails = {
    username: username,
    password: hash
  };
  db.addUser(userDetails)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(error => {
      res.status(500).json({
        message: "Failure to create new user",
        error: error
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
