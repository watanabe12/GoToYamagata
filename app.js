const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const app = express();
const db = require('./db_connecter');

app.use(helmet());

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
	const sql = "INSERT INTO questionnaire SET ?"
	db.connection.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.render("presents.ejs");
	});
});

const json2csv = require('json2csv');
const jconv = require('jconv');
app.get('/download', function(req, res, next) {
  const sql = "select * from questionnaire";
  db.connection.query(sql, function (err, result, fields) {
  if (err) throw err;
  const csv = json2csv.parse(result, ['age', 'Prefectures']);
  res.setHeader('Content-disposition', 'attachment; filename=data.csv');
  res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
  res.send(jconv.convert( csv, 'UTF8', 'SJIS'));
  });
});

/* rooting page */
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const presentsRouter = require('./routes/presents');
app.use('/presents', presentsRouter);
const quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter);
const formRouter = require('./routes/form');
app.use('/form', formRouter);
const answerRouter = require('./routes/answer');
app.use('/answer', answerRouter);
const profileRouter = require('./routes/profile');
app.use('/profile', profileRouter);
const syounaiRouter = require('./routes/syounai');
app.use('/syounai', syounaiRouter);
const okitamaRouter = require('./routes/okitama');
app.use('/okitama', okitamaRouter);
const mogamiRouter = require('./routes/mogami');
app.use('/mogami', mogamiRouter);
const murayamaRouter = require('./routes/murayama');
app.use('/murayama', murayamaRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  /* render the error page */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
