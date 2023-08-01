const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    select: false,  // when we return user, password will not be shown
  },
});

// hash input password in signup
schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
// compare hashed password
schema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = model('User', schema);

module.exports = userModel;
