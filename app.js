// packages

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');




const routes = require('./routes/index');
const wigRoute= require('./routes/wigs');

const app = express();
//connecting mongoose
mongoose.connect('mongodb://localhost/theUnit')
  .then(() => {
    console.log('   ===============================  ')
    console.log('   CONNECTION TO MONGO ESTABLISHED  ')
    console.log('   ===============================  ')
  })
  .catch((err) => {
    console.log('ERROR', err)
  })

// testing vs code commit


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//homepage
app.use('/', routes);
app.use('/wigs', wigRoute)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
