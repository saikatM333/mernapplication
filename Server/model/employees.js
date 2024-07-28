const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  image: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
