const router = require('express').Router();
const mongoose = require("mongoose");
const Request = mongoose.model('Request');
// Endpoints

router.post(`/${process.env.TOKEN}`, function(req, res, next){
    let requestModel = new Request({ request: req.body});
    requestModel.save();
    res.status(200).send('Ok');
});

module.exports = router;
