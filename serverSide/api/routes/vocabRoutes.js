// const vocabBuilder = require('../controllers/vocabController');

// module.exports = app => {
//   app
//     .route('/words')
//     .get(vocabBuilder.list_all_words)
//     .post(vocabBuilder.create_a_word);

//   app
//     .route('/words/:wordId')
//     .get(vocabBuilder.read_a_word)
//     .put(vocabBuilder.update_a_word)
//     .delete(vocabBuilder.delete_a_word);
// };


const express = require('express');
const router = express.Router();
const vocabBuilder = require('../controllers/vocabController');
const { authentication } = require('../../middleware/authentication');


router.use(authentication);

router.route('/')
  .get(vocabBuilder.list_all_words)
  .post(vocabBuilder.create_a_word);

router.route('/:wordId')
  .get(vocabBuilder.read_a_word)
  .put(vocabBuilder.update_a_word)
  .delete(vocabBuilder.delete_a_word);

module.exports = router;