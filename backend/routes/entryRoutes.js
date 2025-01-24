const express = require('express');
const { createEntry, getEntries, updateEntry, deleteEntry } = require('../controllers/entryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Journal entry routes
router.post('/', authMiddleware, createEntry);
router.get('/', authMiddleware, getEntries);
router.put('/:id', authMiddleware, updateEntry);
router.delete('/:id', authMiddleware, deleteEntry);

module.exports = router;
