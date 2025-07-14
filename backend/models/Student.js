const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  email: String,
  mobile: String,
  semester1: Number,
  semester2: Number,
  semester3: Number,
  semester4: Number,
  semester5: Number,
  semester6: Number,
  semester7: Number,
  semester8: Number,
  average: Number,
});

module.exports = mongoose.model('Student', studentSchema);
