const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  mood: { type: String, enum: ['Happy', 'Neutral', 'Sad'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
