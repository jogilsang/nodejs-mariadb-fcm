var express = require('express');
var mdbConn = require('../models/mariaDBConn');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAsHK3zM4:APA91bETD6WbzHmslSyMIhiWTqzlOXxCZhheGMhtLSFTyFupQOnp8cEc9PDGjngdina8ZeE_N2ryZoLY5DSPw4LcmfzSMAE0f40S1s2PgcfxzfnHa5eXrtlP_5fs3Q8EKthByvQy-EJ-'; //put your server key here
var fcm = new FCM(serverKey);

/* GET users listing. */
router.get('/getRooms', function (req, res, next) {
  mdbConn.getRooms()
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

/* GET setUsers listing. */
// ex : http://localhost:3000/api/setUsers/token=sfsadfsadf
router.get('/setUsers/token=:token', function (req, res, next) {

  var token = req.params.token;
  console.log('setUsers :' + token);

  mdbConn.setUsers(token)
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

/* GET setReservation listing. */
// id, title, date, userName, roomName, startTime, endTime, token
router.get('/setReservation', function (req, res, next) {

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
    .then((rows) => {
      res.json(rows)

      // PUSH 구간
      var message = {
        to: '/topics/' + roomName,

        // 커뮤니티룸1
        // '조길상님께서 주간회의 사유로 13:00 ~ 15:00 까지 예약하셨습니다.'

        notification: {
          title: roomName,
          body: userName + '님께서 ' + title + ' 사유로 ' + startTime + ' ~ ' + endTime + '까지 예약하셨습니다.'
        }

      };

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });

    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/getReservation', function (req, res, next) {

  var date = req.query.date;
  var roomName = req.query.roomName;

  mdbConn.getReservation(date, roomName)
    .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
    .catch((err) => { console.error(err); });
});

module.exports = router;
