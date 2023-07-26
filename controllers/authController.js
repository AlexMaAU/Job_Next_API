const userModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Missing email or password');
  }
  try {
    const user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json('Invalid Password');
    }
    // save newUser successfully, then generate a JWT token
    const token = generateToken({ email });
    console.log(token);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json('Missing username or email or password');
  }
  try {
    const newUser = new userModel({ username, email, password });
    // hash password and save it to database
    await newUser.hashPassword();
    await newUser.save();
    // save newUser successfully, then generate a JWT token
    const token = generateToken({ email });
    console.log(token);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

module.exports = {
  login,
  signup,
};
