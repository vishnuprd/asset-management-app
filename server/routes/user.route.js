const {
  adminLogin,
  adminCreate,
  userLogin,
  userSignup,
} = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('User content');
});

router.post('/user/signup', userSignup);

router.post('/user/login', userLogin);

router.post('/admin/create', adminCreate);

router.post('/admin/login', adminLogin);

module.exports = router;
