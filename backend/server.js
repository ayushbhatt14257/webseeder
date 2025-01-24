const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");


dotenv.config();

const app = express();
require("./db/conn");


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const entryRoutes = require('./routes/entryRoutes');

app.use('/api/entries', entryRoutes);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));