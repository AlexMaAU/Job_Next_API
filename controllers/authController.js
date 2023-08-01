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
      .select('+password') // .select('+password'), get password from database, need password for comparing. By model setting, when we return user, password will not be shown
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
    // remove password from user，and return processed user to frontend
    user.password = undefined;
    // save newUser successfully, then generate a JWT token
    const token = generateToken({ email });
    console.log(token);
    res.status(201).json({ user, token }); // send token to frontend, token contains user.email
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
    res.status(201).json({ newUser, token });
  } catch (err) {
    next(err);
  }
};

// user update password - after login
const updateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // use joi to validate data, then store validated data into database
    const validBody = await userSchema.validateAsync({
      username: username,
      password: password,
    });

    // userId or email can be passed down from header or using redux store
    const user = await userModel
      .findOneAndUpdate({ email: req.user.email }, validBody, { new: true })
      .exec();

    // if (name) {
    //   user.name = name;
    // }
    user.username = username ?? user.username; //if name is undefined, using user.name by default
    user.password = password ?? user.password; //if password is undefined, using user.password by default

    // hash password and save it to database
    await user.hashPassword();
    await user.save();
    res.status(200).json({ msg: 'update success' });
  } catch (err) {
    next(err);
  }
};

// user forget password - before login
// TO DO Later
// Use third-party for authentication, send verify code to cellphone or email
// 1. frontend send request to backend, ask user to provide valid cellphone number or email address
// 2. backend generate a random verify code 
// 3. save the verify code under selected user
// 4. verify code saved in database should have expire time, usually expire in 5 or 10 mins
// 5. Send the verify code to user cellphone or email
// 6. User input received code, and compare with the verify code stored in database under that user
// 7. if compare success, update new password and following logics

module.exports = {
  login,
  signup,
  updateUser,
};
