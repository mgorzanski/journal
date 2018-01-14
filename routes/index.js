var express = require('express');
var router = express.Router();
var db = require('../dbconnection');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

const { check, validationResult } = require('express-validator/check');

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
router.get('/', function (req, res, next) {
  res.send("");
});

router.get('/api/entries', authCheck, function(req, res, next) {
  db.query("select * from entries order by id desc", function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/api/add-entry', [
  check('title').exists(),
  check('datetime').exists().matches(/\d\-/),
  check('content').exists().not().isEmpty(),
], authCheck, function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const entry = req.body;  
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
