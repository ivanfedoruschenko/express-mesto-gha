// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CodeError = require('../errors/error-code');
const ConflictValueError = require('../errors/error-conflict-value');
const NotFoundError = require('../errors/error-not-found');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name, about: user.about, avatar: user.avatar, email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CodeError('Введенные данные неккоректны'));
            return;
          } if (err.code === 11000) {
            next(new ConflictValueError('При регистрации указан email, который уже существует'));
            return;
          } next(err);
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CodeError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Введенные данные неккоректны'));
        return;
      } next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Введенные данные неккоректны'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          'some-key',
          { expiresIn: '7d' },
        );
        res.send({ token });
      } else {
        throw new NotFoundError('Передан неверный логин или пароль');
      }
    })
    .catch(next);
};

module.exports.getCurrenUser = (req, res, next) => {
  User.findOne(req.user.email).select('+password')
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
