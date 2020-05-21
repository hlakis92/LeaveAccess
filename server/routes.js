
// route for the api
module.exports = function (app) {
  app.use('/api', require('./api'));
};
