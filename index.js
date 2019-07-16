const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

let contents = fs.readFileSync("./requests/http-client.private.env.json");
const params = JSON.parse(contents);
const key = params.development.key;
const port = params.development.port;
const bot = new TelegramBot(key, {polling: true});

app.use(bodyParser.json());

// Endpoints
app.post(`/${key}`, (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
});

// Endpoints
app.get('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

console.log(key);

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
