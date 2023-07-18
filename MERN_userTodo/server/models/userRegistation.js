const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegistation = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['Admin', 'Client'],
  },
  userStatus: {
    type: String,
    required: true,
    enum: ['ACTIVE', 'INACTIVE'],
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ]
}, {
  collection: 'userRegistations'
});

const UserRegistation = mongoose.model('userRegistations', userRegistation);

module.exports = UserRegistation;
