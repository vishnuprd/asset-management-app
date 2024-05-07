const { addAssets, getAssets } = require('../controllers/assets.controller');
const router = require('express').Router();

router.get('/', getAssets);

router.post('/create', addAssets);

module.exports = router;
