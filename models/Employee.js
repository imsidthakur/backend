const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'], 
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
