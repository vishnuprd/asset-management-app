const Assets = require('../models/assets.model');
exports.getAssets = async (req, res) => {
  // get jwt token from header

  const user = req.user;
  // check if user has user role, then return assets only for that user

  if (user.roles.includes('admin')) {
    const assets = await Assets.find();

    return res.status(200).json(assets);
  } else if (user.roles.includes('user')) {
    const assets = await Assets.find({ userId: user.id });

    return res.status(200).json(assets);
  }
};

exports.addAssets = async (req, res) => {
  const user = req.user;
  if (!user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { name, description, userId, category } = req.body;

  if (!name || !description || !userId || !category) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const newAssets = new Assets({
    name,
    description,
    userId,
    category,
  });

  await newAssets.save();

  res.status(201).json({ message: 'Assets created successfully' });
};
