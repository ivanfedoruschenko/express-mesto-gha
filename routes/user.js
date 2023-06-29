const router = require('express').Router();

const {
  createUser, getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('me/avatar', updateAvatar);

module.exports = router;
