const router = require('express').Router();
const fs = require("fs");

// Endpoints
router.get('/robots.txt', function(req, res){
    fs.readFile('./robots.txt', 'utf8', function(err, contents) {
        res.status(200).send(contents);
    });
});

module.exports = router;
