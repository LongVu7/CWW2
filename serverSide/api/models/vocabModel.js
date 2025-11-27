const mongoose = require('mongoose');

const { Schema } = mongoose;

const VocabSchema = new Schema(
  {
    english: {
      type: String,
      required: 'English word cannot be blank'
    },
    german: {
      type: String,
      required: 'German word cannot be blank'
    },
    french: {
      type: String,
      required: 'French word cannot be blank'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { collection: 'vocab5' }
);

module.exports = mongoose.model('Vocab', VocabSchema);