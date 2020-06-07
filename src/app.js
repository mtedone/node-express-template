const express = require('express');
const path = require('path')
const homeRouter = require('./routers/index');

const app = express();

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));

app.use(express.json()); // Order matters. This must come before the routers or body JSON payloads will be null
app.use(homeRouter);

module.exports = app;