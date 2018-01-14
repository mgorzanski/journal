var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://mgjr.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: 'localhost',
  issuer: 'https://mgjr.eu.auth0.com/',
  algorithms: ['RS256']
});

/* GET home page. */
router.get('/api/entries', authCheck, function(req, res, next) {
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
  db.query({
      sql: "INSERT INTO entries (title, datetime, content) VALUES (?, ?, ?)",
    },
    [entry.title, entry.datetime, entry.content],
    function (error, results, fields) {
      if (error) {
        res.json(error);
      } else {
        res.json({"status": "success"});
      }
    }
  );
});

module.exports = router;
