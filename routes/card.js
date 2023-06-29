const router = require('express').Router();

const {
  createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/card');

router.post('/', createCard);

router.delete('/:cardId', deleteCards);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
