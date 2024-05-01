const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
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
  },
  token:{
    type: String,
    default: null
  },

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
