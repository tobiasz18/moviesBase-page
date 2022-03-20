const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  firstName: {
    type: String,
    trim: true,
    maxLength: 100
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 100
  },
  age: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  // timestamps: true, collection: "user"
});

userSchema.pre('save', async function (next) {
  // this === user
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

userSchema.methods.generateEmailToken = function () {
  // this === user
  const userObj = { _id: this._id.toHexString() };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: '1d' });
  return token;
}

userSchema.methods.generateToken = function () {
  // this === user
  const userObj = { _id: this._id.toHexString(), email: this.email };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: '1d' });
  return token;
}

userSchema.statics.emailTaken = async function (email) {
  // this reference to the User 
  const user = await this.findOne({ email });
  return !!user;
}

userSchema.methods.comparePassword = async function (myPlaintextPassword) {
  // this === user
  const result = bcrypt.compare(myPlaintextPassword, this.password);
  return result;
}

const User = mongoose.model('User', userSchema);
module.exports = { User };