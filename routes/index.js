var express = require('express');
var mdbConn = require('../models/mariaDBConn');
var router = express.Router();

/* localhost:3000 주소로 접속 시 작동되는 라우터 */
router.get('/', function (req, res, next) {
  res.send('회의실 예약 앱 - 웹 서버');
});

module.exports = router;


