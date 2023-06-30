const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const { ERROR_NOT_FOUND } = require('../errors/errors');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Неправильный адрес' });
});

module.exports = router;
