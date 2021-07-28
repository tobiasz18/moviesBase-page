const express = require('express');
const router = express.Router();
require('dotenv').config();

const { User } = require('../../models/user_model');

router.route('/register')
  .post((req, res) => {
    res.status(200).send('ok');
  })

module.exports = router;