const {
  adminLogin,
  adminCreate,
  userLogin,
  userSignup,
  getUsers,
} = require('../controllers/user.controller');
const verifyToken = require('../utils/vertify-token');

const router = require('express').Router();

router.get('/get-user', verifyToken, (req, res) => {
  res.send(req.user);
});

router.get('/users', verifyToken, getUsers);

router.post('/user/signup', userSignup);

router.post('/user/login', userLogin);

router.post('/admin/create', adminCreate);

router.post('/admin/login', adminLogin);

module.exports = router;
