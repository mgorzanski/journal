var express = require('express');
var router = express.Router();
var db = require('../dbconnection');

/* GET home page. */
router.get('/api/entries', function(req, res, next) {
  db.query("select * from entries order by id desc", function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/api/add-entry', function (req, res, next) {
  let entry = req.body;
  db.query("insert into entries (title, datetime, content) values (?,?,?)",[entry.title, entry.datetime, entry.content], function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json({"status": "success"});
    }
  });
});

module.exports = router;
