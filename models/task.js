const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  listId: {
    type: Number,
    required: true
  }
  
});
  
module.exports = mongoose.model('Task', taskSchema, 'notes');
  