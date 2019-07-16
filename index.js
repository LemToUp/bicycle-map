const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const https = require('https');
const axios = require('axios');
const bodyParser = require('body-parser');

let contents = fs.readFileSync("./requests/http-client.private.env.json");
const params = JSON.parse(contents);
const key = params.development.key;
const port = params.development.port;
const bot = new TelegramBot(key, {polling: true});

const data = [];

app.use(bodyParser.json());

// Endpoints
app.post(`/${key}`, (req, res) => {
    data.push(req.body);
    res.status(200).send([...data]);
});

// Endpoints
app.get('/', (req, res) => {
    res.send(req.body);
});

// Endpoints
app.get('/robots.txt', (req, res) => {
    fs.readFile('./robots.txt', 'utf8', function(err, contents) {
        res.status(200).send(contents);
    });
});

// Listening
https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, app).listen(port, () => {
    console.log(`Listening on port ${port}`);
});

/*bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});*/
