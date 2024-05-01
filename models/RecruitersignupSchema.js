const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  institutename: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: true,
  }

});

const Recruiter = mongoose.model('Recruiter', RecruiterSchema);

module.exports = Recruiter;
