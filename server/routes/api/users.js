const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
const router = express.Router();
require('dotenv').config();

const { User } = require('../../models/user_model');

router.route('/register')
  .post(async (req, res) => {
    try {
      if (await User.emailTaken(req.body.email)) {
        return res.status(400).json({ message: 'Sorry email taken' });
      }

      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      const generateToken = user.generateToken();
      const doc = await user.save();

      res.cookie('x-access-token', generateToken)
        .status(200)
        .send(getUserProps(doc));

    } catch (error) {
      res.status(400).json({ message: 'Error', error: error });
    }
  });

router.route('/signin')
  .post(async (req, res) => {
    try {
      // find user
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ message: "Bad email" });

      // compare password
      const compare = await user.comparePassword(req.body.password);
      if (!compare) return res.status(400).json({ message: "Bad password" });

      // generate token
      const token = user.generateToken();

      // send response
      res.cookie('x-access-token', token)
        .status(200).send(getUserProps(user));

    } catch (error) {
      res.status(400).json({ message: 'Error', error: error });
    }
  });

router.route("/profile")
  .get(checkLoggedIn, async (req, res) => {
    console.log(req.user)
    res.status(200).send('siema')
  });

const getUserProps = (user) => {
  return {
    _id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    role: user.role
  }
}

module.exports = router;

