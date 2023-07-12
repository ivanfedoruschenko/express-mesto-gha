const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrenUser,
} = require('../controllers/user');

const {
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../utils/validation');

router.get('/', getUsers);

router.get('/me', getCurrenUser);

router.get('/:userId', validationGetUserById, getUserById);

router.patch('/me', validationUpdateUser, updateUser);

router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
