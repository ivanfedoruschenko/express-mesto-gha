const User = require('../models/user');
const { ERROR_DEFAULT, ERROR_CODE, ERROR_NOT_FOUND } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'ПОльзователь не найден' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};
