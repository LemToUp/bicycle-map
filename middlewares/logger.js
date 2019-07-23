const mongoose = require("mongoose");
const Request = mongoose.model('Request');
const bodyParser = require('body-parser');

const logger = (ctx, next) => {
    return next(ctx).then(() => {
        console.log(ctx);
    })
};

module.exports = logger;
