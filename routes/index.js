var express = require('express');
var cors = require('cors');
var router = express.Router();
var test = '10'

router.use(cors());

router.get('/', function(req, res, next) {

  res.json({msg: 'This is CORS-enabled for all origins!'})
});

module.exports = router;
