const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('Employee', employeesSchema);