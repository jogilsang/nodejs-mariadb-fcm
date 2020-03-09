var express = require('express');
var mdbConn = require('../models/mariaDBConn');
var router = express.Router();

/* GET users listing. */
router.get('/getRooms', function(req, res, next) {
  mdbConn.getRooms()
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

/* GET setUsers listing. */
// ex : http://localhost:3000/api/setUsers/token=sfsadfsadf
router.get('/setUsers/token=:token', function(req, res, next) {

  var token = req.params.token;
  console.log('setUsers :' + token);

  mdbConn.setUsers(token)
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

/* GET setReservation listing. */
// id, title, date, userName, roomName, startTime, endTime, token
router.get('/setReservation', function(req, res, next) {

  var title = req.query.title;
  var date = req.query.date;
  var userName = req.query.userName;
  var roomName = req.query.roomName;
  var startTime = req.query.startTime;
  var endTime = req.query.endTime;
  var token = req.query.token;

  console.log('setReservation :');

  console.log(title);
  console.log(date);
  console.log(userName);

  mdbConn.setReservation(req.query)
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

router.get('/getReservation', function(req, res, next) {

  var date = req.query.date;
  var roomName = req.query.roomName;

  mdbConn.getReservation(date, roomName)
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

module.exports = router;
