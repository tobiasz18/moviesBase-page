const express = require('express');
const router = express.Router();
require('dotenv').config();

const { User } = require('../../models/user_model');

router.route('/register')
  .post(async (req, res) => {
    try {
      if(await User.emailTaken(req.body.email)) {
        return res.status(400).json({message: 'Sorry email taken'}); 
      }

      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });
  
      const doc = await user.save();
      res.cookie('x-access-token','jdbkhsdbh')
        .status(200).send(doc); 
    } catch (error) {
      res.status(400).json({message: 'Error', error: error});
    }
  });

module.exports = router;


/*
    /// 1 check if email taken
    /// 2 create model (hash password)
    /// 3 generate token
    /// 4 send email
    /// save and send token witn cookie
*/