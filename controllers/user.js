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
  User.findById(req.params.id)
    .orFail(() => {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: req.body.name, about: req.body.about })
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
  User.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};
