const userModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const userSchema = require('../validations/userValidation');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: 'Missing email or password' });
  }
  try {
    const user = await userModel
      .findOne({ email: email })
      // .select('-email')  // select('-email'), get user data from database without email records.
      .exec();
    console.log(user);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid Password' });
    }
    // save newUser successfully, then generate a JWT token
    const token = generateToken({ email });
    console.log(token);
    res.status(201).json(token); // send token to frontend, token contains user.email
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(401)
      .json({ error: 'Missing username or email or password' });
  }
  try {
    // use joi to validate data, then store validated data into database
    const validBody = await userSchema.validateAsync({
      username,
      email,
      password,
    });

    //check if email has been taken
    const emailCheck = userModel.findOne({ email }).exec();
    if (emailCheck) {
      return res
        .status(400)
        .json({ error: 'This email has been taken. Please try another.' });
    }

    // if all good, create records in database
    const newUser = new userModel(validBody);
    // hash password and save it to database
    await newUser.hashPassword();
    await newUser.save();

    // save newUser successfully, then generate a JWT token
    const token = generateToken({ email });
    console.log(token);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signup,
};
