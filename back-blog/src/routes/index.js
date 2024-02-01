const Router = require('express');
const Posts = require('./Posts');
const Filters = require('./Filters');
const app = Router();


app.use('/', Posts);
app.use('/filters', Filters);

module.exports = app;