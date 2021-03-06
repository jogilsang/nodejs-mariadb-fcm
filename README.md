# nodejs-mariadb-fcm
nodejs + mariadb + fcm + express

### URL
```
WEB Lang : Nodejs
WEB Framework : express
WEB URL : http://ec2-3-17-80-149.us-east-2.compute.amazonaws.com:3000

DB Lang : MariaDB
DB IDE : Toad Edge
DB URL : http://ec2-3-17-80-149.us-east-2.compute.amazonaws.com:3306

Environment : Ubuntu 18.04 + Docker

```
### Query
```
getRooms : 회의실정보 조회(R)
setUsers : 사용자 정보 생성(C)
setReservation : 예약정보 생성(C)
getReservation : 예약정보 조회(R)
updateReservation : 예약정보 수정(U)
delReservation : 예약정보 삭제 (D)
```

### table
```
reservations
+----+------------------------+------------+--------------------+------------------+-----------+---------+------------+--------+
| id | title                  | date       | userName           | roomName         | startTime | endTime | token      | roomId |
+----+------------------------+------------+--------------------+------------------+-----------+---------+------------+--------+
|  1 | 사업부 주간회의        | 2020-03-07 | 조길상             | 커뮤니티룸1      | 12:00     | 13:00   | tokenAdmin |      1 |
|  2 | 사업부 주간회의        | 2020-03-07 | 조길상             | 커뮤니티룸2      | 15:00     | 16:00   | test       |      2 |
|  3 | 사업부 주간회의        | 2020-03-07 | 조길상             | 커뮤니티룸3      | 08:00     | 09:00   | tokenAdmin |      3 |
|  4 | 사업부 주간회의        | 2020-03-07 | 홍길동             | 커뮤니티룸3      | 09:00     | 10:00   | tokenAdmin |      3 |
|  5 | 사업부 주간회의        | 2020-03-07 | 아무개             | 커뮤니티룸2      | 10:00     | 11:00   | tokenAdmin |      2 |
|  6 | 코로나대책             | 2020-03-07 | 조길상             | 커뮤니티룸1      | 08:00     | 08:00   |            |      1 |
|  7 | 테스트                 | 2020-03-08 | 테스트             | 커뮤니티룸1      | 08:00     | 08:30   |            |      1 |
|  8 | 테스트                 | 2020-03-08 | 테스트             | 커뮤니티룸1      | 08:30     | 08:60   |            |      1 |
|  9 | 테스트                 | 2020-03-08 | 테스트             | 커뮤니티룸1      | 09:30     | 010:00  |            |      1 |
| 10 | 연예가중계             | 2020-03-08 | 현빈               | 커뮤니티룸1      | 10:00     | 11:00   |            |      1 |
+----+------------------------+------------+--------------------+------------------+-----------+---------+------------+--------+
10 rows in set (0.00 sec)

users
+----+-----------------+
| id | token           |
+----+-----------------+
|  1 | test            |
|  2 | token=sdafadfsf |
|  3 | sfsadfsadf      |
|  4 | {}              |
|  5 | {}              |
|  6 | {}              |
+----+-----------------+
6 rows in set (0.01 sec)

rooms
+----+-------------+------------+--------+
| id | name        | department | isUsed |
+----+-------------+------------+--------+
|  1 | 커뮤니티룸1 | 자율       |      1 |
|  2 | 커뮤니티룸2 | 자율       |      1 |
|  3 | 커뮤니티룸3 | 자율       |      1 |
|  4 | 커뮤니티룸4 | 자율       |      1 |
+----+-------------+------------+--------+
```

