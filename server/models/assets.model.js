const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetsSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Assets = mongoose.model('Assets', assetsSchema);

module.exports = Assets;
