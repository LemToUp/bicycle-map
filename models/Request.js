const mongoose = require('mongoose');

const schema = new mongoose.Schema({ request: Object});
mongoose.model('Request', schema);

