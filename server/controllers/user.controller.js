const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.adminCreate = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({
    username,
    email,
    password,
    roles: ['admin'],
  });

  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User Not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }

  const payload = {
    user: {
      id: user.id,
      roles: user.roles,
    },
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({
    username,
  });

  if (!user || !user.roles.includes('user')) {
    return res.status(404).json({ message: 'User Not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }

  const payload = {
    user: {
      id: user.id,
      roles: user.roles,
    },
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};

exports.userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({
    username,
  });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    roles: ['user'],
  });

  await newUser.save();
  const payload = {
    user: {
      id: newUser._id,
      roles: newUser.roles,
    },
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};

exports.getUsers = async (req, res) => {
  const user = req.user;

  if (!user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const users = await User.find();

  // filter out admin users
  const filteredUsers = users.filter((user) => !user.roles.includes('admin'));

  // remove password field from response
  const filteredUsersWithoutPassword = filteredUsers.map((user) => {
    const { password, ...filteredUser } = user._doc;
    return filteredUser;
  });
  res.status(200).json(filteredUsersWithoutPassword);
};

exports.getUser = async (req, res) => {
  const user = req.user;

  const dbUser = await User.findById(user.id);

  const userWithoutPassword = { ...dbUser._doc };

  delete userWithoutPassword.password;

  res.status(200).json(userWithoutPassword);
};
