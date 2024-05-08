const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/user.route');
const assetRoutes = require('./routes/assets.route');
const verifyToken = require('./utils/vertify-token');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.use('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use('/assets', verifyToken, assetRoutes);

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

console.log('Connecting to the database...');
db.mongoose
  .connect(process.env.MONGODB_URL, clientOptions)
  .then(() => {
    console.log('Connected to the database!');

    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
