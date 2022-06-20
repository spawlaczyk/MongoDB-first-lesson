const mongoose = require('mongoose');

const departmentsSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  versionKey: false
});

module.exports = mongoose.model('Department', departmentsSchema);