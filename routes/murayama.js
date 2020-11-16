'use strict';
var express = require('express');
var router = express.Router();
const db = require('../db_connecter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = "select count(Prefectures) from questionnaire WHERE Prefectures = '村山'";
  db.connection.query(sql, function (err, result, fields) {
    const count = result[0]['count(Prefectures)']; 
    if (err) throw err;
    res.render('murayama',{values: count});
  });
});

module.exports = router;
