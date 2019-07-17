const fs = require("fs");
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

let contents = fs.readFileSync("./requests/http-client.private.env.json");
const params = JSON.parse(contents);
const key = params.development.key;
const port = params.development.port;
mongoose.connect("mongodb://localhost:27017/bot", { useNewUrlParser: true });

const RequestCollection = mongoose.model('Request', { request: Object  });
app.use(bodyParser.json());

// Endpoints
app.post(`/${key}`, (req, res) => {
    let requestModel = new RequestCollection({ request: req.body});
    requestModel.save();
    res.status(200).send('Ok');
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
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.pem')
}, app);

httpsServer.listen(port, () => {
    console.log("server starting on port : " + port)
});

// Listening
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log("server starting on port : " + 80)
});
