const router = require('express').Router();

const {
  createUser, getUsers, getUserById, updateUser, updateAvatar, login, getCurrenUser,
} = require('../controllers/user');

router.get('/me', getCurrenUser);

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
