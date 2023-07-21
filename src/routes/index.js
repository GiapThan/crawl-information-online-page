const adminRouter = require('./admin');

function route(app) {
  app.use('/admin', adminRouter);
  app.use('/', (req, res) => {
    res.redirect('/admin');
  });
}

module.exports = route;
