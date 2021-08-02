const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
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

      /*----------send email----------*/

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
// Test accescontrol npm,
router.route("/profile")
  .get(checkLoggedIn, grantAccess('readOwn', 'profile'), async (req, res) => {
    try {
      const permission = res.locals.permission;

      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ message: "bad user" });

      res.status(200).json(permission.filter(user._doc));

    } catch (error) {
      return res.status(400).send(error);
    }
  })
  .patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          "$set": {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
          }
        },
        { new: true }
      );
      if (!user) return res.json({ message: 'User not found' });

      res.status(200).json(getUserProps(user));
    } catch (error) {
      res.status(400).json({ message: 'Problem updating', error: error });
    }
  })

router.route('/isauth')
  .get(checkLoggedIn, async (req, res) => {
    res.status(200).send(getUserProps(req.user))
  })

router.route('/update_email')
  .patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
      if (await User.emailTaken(req.body.newEmail)) {
        return res.status(400).json({ message: 'Sorry email taken' });
      }
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, email: req.body.email },
        {
          "$set": {
            email: req.body.newEmail,
          }
        },
        { new: true }
      );
      if (!user) return res.json({ message: 'User not found' });

      const token = user.generateToken();
      res.cookie('x-access-token', token)
      .status(200).send({email: user.email});

    } catch (error) {
      return res.status(400).json({ message: 'Problem updating', error: error });
    }
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

