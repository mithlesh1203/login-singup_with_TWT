const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  emailId: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      }
    }
  ]
},{
  collection: 'users'
})


const User = mongoose.model('users', userSchema);

module.exports = User;