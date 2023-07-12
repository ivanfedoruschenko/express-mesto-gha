const Card = require('../models/card');
const CodeError = require('../errors/error-code');
const NotFoundError = require('../errors/error-not-found');
const ForbiddenRequestError = require('../errors/error-forbidden-request');

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Переданные данные некорректны'));
        return;
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCards = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new Error('Not Found'))
    .then((card) => {
      if (!card) { throw new NotFoundError('Карточка не найдена'); }
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenRequestError('Запрещено удалять чужие карточки');
      }
      card.deleteOne()
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CodeError('Переданы некорректные данные'));
        return;
      } next(err);
    });
};
