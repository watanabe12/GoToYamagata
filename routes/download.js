'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db_connecter');
const json2csv = require('json2csv');
const jconv = require('jconv');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "select * from questionnaire";
  db.connection.query(sql, function (err, result, fields) {
  if (err) throw err;
  const csv = json2csv.parse(result, ['age', 'Prefectures']);
  res.setHeader('Content-disposition', 'attachment; filename=data.csv');
  res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
  res.send(jconv.convert( csv, 'UTF8', 'SJIS'));
  });
});

module.exports = router;