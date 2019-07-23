const mongoose = require("mongoose");
const Request = mongoose.model('Request');

const logger = (req, res, next) => {
    let requestModel = new Request({ request: req.body});
    requestModel.save();
    next();
};

module.exports = logger;
