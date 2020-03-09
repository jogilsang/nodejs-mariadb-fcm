var express = require('express');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAsHK3zM4:APA91bETD6WbzHmslSyMIhiWTqzlOXxCZhheGMhtLSFTyFupQOnp8cEc9PDGjngdina8ZeE_N2ryZoLY5DSPw4LcmfzSMAE0f40S1s2PgcfxzfnHa5eXrtlP_5fs3Q8EKthByvQy-EJ-'; //put your server key here
var fcm = new FCM(serverKey);

/* localhost:3000 주소로 접속 시 작동되는 라우터 */
router.get('/', function (req, res, next) {
  res.send('FCM 단체전송');

  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: '/topics/default',
    // collapse_key: 'your_collapse_key',

    notification: {
      title: '커뮤니티룸1',
      body: '조길상님께서 주간회의 사유로 13:00 ~ 15:00 까지 예약하셨습니다.'
    }

    // data: {  //you can send only notification or only data(or include both)
    //   my_key: 'my value',
    //   my_another_key: 'my another value'
    // }
  };


  console.log * (message);

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });

  // fcm.subscribeToTopic(['device_token_1', 'device_token_2'], 'some_topic_name', (err, res) => {
  //   assert.ifError(err);
  //   assert.ok(res);
  //   done();
  // });

});

module.exports = router;


