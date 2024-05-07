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

  const newUser = new User({
    username,
    email,
    password,
    roles: ['user'],
  });

  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
};
