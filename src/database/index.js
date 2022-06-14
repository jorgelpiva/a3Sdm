const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/boston'), { useMongoCliente: true};
mongoose.Promise = global.Promise;

module.exports = mongoose

