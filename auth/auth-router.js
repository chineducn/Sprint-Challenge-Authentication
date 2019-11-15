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
  const { username, password } = req.body
  db.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({
          message: "Welcome " + user.username,
          token: token
        })
      }
      else {
        res
          .status(401)
          .json({
          message: "Invalid credentials"
        })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({
        message: "There was a failure",
        error: error
      })
    })
});

module.exports = router;
