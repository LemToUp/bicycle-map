const fs = require("fs");
//const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const axios = require('axios');
const bodyParser = require('body-parser');

let contents = fs.readFileSync("./requests/http-client.private.env.json");
const params = JSON.parse(contents);
const key = params.development.key;
const port = params.development.port;
//const bot = new TelegramBot(key, {polling: true});

const data = [];

app.use(bodyParser.json());

// Endpoints
app.post(`/${key}`, (req, res) => {
    data.push(req.body);
    console.log(data);
    res.status(200).send([...data]);
});

// Endpoints
app.get('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Endpoints
app.get('/robots.txt', (req, res) => {
    fs.readFile('./robots.txt', 'utf8', function(err, contents) {
        console.log(contents);
        res.status(200).send(contents);
    });
});

// Listening
const httpsServer = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app);

httpsServer.listen(port, () => {
    console.log("server starting on port : " + port)
});

// Listening
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log("server starting on port : " + port)
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
