const JournalEntry = require('../models/JournalEntry');
const fetchMotivationalQuote = require('../utils/fetchQuote');


exports.createEntry = async (req, res) => {
  const { title, content, mood } = req.body;
  try {
    const newEntry = new JournalEntry({
      userId: req.user.userId,
      title,
      content,
      mood,
    });
    await newEntry.save();

    // Fetch a motivational quote
    const motivationalQuote = await fetchMotivationalQuote();

    res.status(201).json({
      message: 'Journal entry created successfully',
      newEntry,
      motivationalQuote,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all journal entries for the logged-in user
exports.getEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.userId }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a journal entry
exports.updateEntry = async (req, res) => {
  const { id } = req.params;
  const { title, content, mood } = req.body;
  try {
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, content, mood },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.status(200).json({ message: 'Journal entry updated successfully', entry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a journal entry
exports.deleteEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await JournalEntry.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.status(200).json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
