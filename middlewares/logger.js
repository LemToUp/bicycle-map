const mongoose = require("mongoose");
const Request = mongoose.model('Request');

const logger = (ctx, next) => {
    return next(ctx).then(() => {
        console.log(ctx.update);
        let requestModel = new Request({ request: ctx.update});
        requestModel.save();
    })
};

module.exports = logger;
