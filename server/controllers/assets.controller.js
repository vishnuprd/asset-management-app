const Assets = require('../models/assets.model');
const User = require('../models/user.model');
exports.getAssets = async (req, res) => {
  // get jwt token from header

  const user = req.user;
  // check if user has user role, then return assets only for that user

  if (user.roles.includes('admin')) {
    const assets = await Assets.find();

    // match user id with assets userId
    const assetsWithUser = await Promise.all(
      assets.map(async (asset) => {
        const user = await User.findById(asset.userId);
        return {
          ...asset._doc,
          userName: user.username,
        };
      }),
    );

    return res.status(200).json(assetsWithUser);
  } else if (user.roles.includes('user')) {
    const assets = await Assets.find({ userId: user.id });

    const user = await User.findById(user.id);

    const assetsWithUser = assets.map((asset) => {
      return {
        ...asset._doc,
        userName: user.username,
      };
    });

    return res.status(200).json(assetsWithUser);
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
