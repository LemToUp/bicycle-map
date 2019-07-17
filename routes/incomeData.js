const router = require('express').Router();
const mongoose = require("mongoose");
const RequestCollection = mongoose.model('Request', { request: Object  });
// Endpoints

router.post(`/${process.env.TOKEN}`, function(req, res, next){
    let requestModel = new RequestCollection({ request: req.body});
    requestModel.save();
    res.status(200).send('Ok');
});

module.exports = router;
