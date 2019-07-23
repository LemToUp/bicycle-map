require('dotenv').config();
const fs = require("fs");
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const Telegraf = require('telegraf');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).catch(function(err) {
    console.log(err);
});

const bot = new Telegraf(process.env.TOKEN);
bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'));

bot.telegram.setWebhook(`${process.env.URL}/${process.env.TOKEN}`, {
    source: './server.pem'
});

require('./models/Request');

app.use(bodyParser.json());
app.use(require('./middlewares/logger'));
app.use(bot.webhookCallback(`/${process.env.TOKEN}`));
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Listening
const httpsServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.pem')
}, app);

httpsServer.listen(process.env.PORT, () => {
    console.log("server starting on port : " + process.env.PORT)
});

// Listening
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log("server starting on port : " + 80)
});
