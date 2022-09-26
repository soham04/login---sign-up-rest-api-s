var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  phone: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);