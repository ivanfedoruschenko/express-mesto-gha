const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const { ERROR_NOT_FOUND } = require('../errors/errors');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { validationCreateUser, validationLogin } = require('../utils/validation');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Неправильный адрес' });
});

module.exports = router;
