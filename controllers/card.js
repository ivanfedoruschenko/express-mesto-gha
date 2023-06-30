const Card = require('../models/card');
const { ERROR_DEFAULT, ERROR_CODE, ERROR_NOT_FOUND } = require('../errors/errors');

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Введенные данные неккоректны' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Произошла неизвестная ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCards = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Документ не найден' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка' });
      }
    });
};
