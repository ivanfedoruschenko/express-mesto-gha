const router = require('express').Router();
const {
  validationGetCard,
  validationCreateCard,
  validationDeleteCard,
  validationDislikeCard,
  validationLikeCard,
} = require('../utils/validation');

const {
  createCard, deleteCards, likeCard, dislikeCard, getCards,
} = require('../controllers/card');

router.get('/', validationGetCard, getCards);

router.post('/', validationCreateCard, createCard);

router.delete('/:cardId', validationDeleteCard, deleteCards);

router.put('/:cardId/likes', validationLikeCard, likeCard);

router.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = router;
