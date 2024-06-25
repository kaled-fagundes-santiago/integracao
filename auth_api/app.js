var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');

var subscriberRouter = require('./src/routes/subscriberRouter');
const connection = require('./src/database/mysql');
const carrega = require('./src/database/carregadados');

connection.on('connect', () => {
  carrega.carregarDados();

  console.log('Conectado ao MySQL!');
});

connection.on('error', (err) => {
  console.log('Erro na conexão com o MySQL:', err);
});

connection.on('end', () => {
  console.log('Desconectado do MySQL!');
});
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', subscriberRouter);

app.use(function(req, res, next) {
  
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

