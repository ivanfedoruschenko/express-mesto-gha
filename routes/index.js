const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { validationCreateUser, validationLogin } = require('../utils/validation');
const NotFoundError = require('../errors/error-not-found');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (reg, res) => {
  next(new NotFoundError('Неправильный адрес'));
});

module.exports = router;
