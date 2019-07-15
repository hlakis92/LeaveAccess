let middleware = require('./middleware');
// console.log("...........................");

module.exports = function (app) {
  app.use('/api', require('./api'));
};
