const mongoose = require('mongoose');

const todoDetailsSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  collection: 'Todos'
});

const Todo = mongoose.model('Todo', todoDetailsSchema);

module.exports = Todo;
