const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
