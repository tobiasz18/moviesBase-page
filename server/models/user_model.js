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
      if(!validator.isEmail(value)) {
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
  }
},{
  // timestamps: true, collection: "user"
});

userSchema.pre('save', async function(next) {
    // this === user
    if(this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    }
    next();
});

userSchema.statics.emailTaken = async function(email) { 
  // this reference to the User 
  const user = await this.findOne({email}); 
  return !!user;
}

const User = mongoose.model('User', userSchema);
module.exports = { User };