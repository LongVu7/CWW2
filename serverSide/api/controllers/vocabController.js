const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');


exports.list_all_words = async (req, res) => {
  try {
    const words = await Vocab.find({ user: req.user.id });
    res.json(words);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};



exports.create_a_word = async (req, res) => {
  try {
    const newWord = new Vocab(req.body);
    newWord.user = req.user.id;

    const word = await newWord.save();
    res.status(201).json(word);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


exports.read_a_word = async (req, res) => {
  try {
    const word = await Vocab.findOne(req.params.wordId);
    res.json(word);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};




exports.update_a_word = async (req, res) => {
  try {
    const word = await Vocab.findOneAndUpdate(
      { _id: req.params.wordId },
      req.body,
      { new: true }
    );
    res.json(word);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// exports.delete_a_word = (req, res) => {
//   Vocab.deleteOne({ _id: req.params.wordId }, err => {
//     if (err) res.send(err);
//     res.json({
//       message: 'Word successfully deleted',
//       _id: req.params.wordId
//     });
//   });
// };

exports.delete_a_word = async (req, res) => {
  try {
    await Vocab.deleteOne({ _id: req.params.wordId });
    res.json({
      message: 'Word successfully deleted',
      _id: req.params.wordId
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};