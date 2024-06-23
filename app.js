const express = require('express');
const chatRouter = require('./routes/chatRouter');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/chat', chatRouter);

module.exports = app;
