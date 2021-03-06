/*** models/mariaDBConn.js ***/

var mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1', 
  port: 3306,
  user: 'root', 
  password: '10376991',
  connectionLimit: 5
});

async function getRooms() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query('USE my_db'); // 사용할 DB 명시
    rows = await conn.query('SELECT * FROM rooms'); // 쿼리 실행
  }
  catch (err) { throw err; }
  finally {
    if (conn) conn.end();
    return rows;
  }
}

async function setUsers(token) {
    console.log('setUsers :' + token);

    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('INSERT INTO users VALUES (id, ?)', [token]); // 쿼리 실행
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();
      return rows;
    }
  }

  // EX : INSERT INTO reservations VALUES (id, '사업부 주간회의', '2020-03-05', '조길상', '커뮤니티룸1', '12:00', '13:00', 'tokenAdmin');
  async function setReservation(params) {

    var title = params.title;
    var date = params.date;
    var userName = params.userName;
    var roomName = params.roomName;
    var startTime = params.startTime;
    var endTime = params.endTime;
    var token = params.token;
    var roomId = params.roomId;

    var arr = [];
    arr.push(title);
    arr.push(date);
    arr.push(userName);
    arr.push(roomName);
    arr.push(startTime);
    arr.push(endTime);
    arr.push(token);
    arr.push(roomId);

    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('INSERT INTO reservations VALUES (id, ?, ?, ?, ?, ?, ? ,?, ?)', arr); // 쿼리 실행
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();

      // 결과 반환
      return rows;
    }
  }

  // EX : INSERT INTO reservations VALUES (id, '사업부 주간회의', '2020-03-05', '조길상', '커뮤니티룸1', '12:00', '13:00', 'tokenAdmin');
  async function updateReservation(params) {

    var id = params.id;
    var title = params.title;
    var date = params.date;
    var userName = params.userName;
    var roomName = params.roomName;
    var startTime = params.startTime;
    var endTime = params.endTime;
    var token = params.token;
    var roomId = params.roomId;
   
    var arr = [];
    arr.push(title);
    arr.push(userName);
    arr.push(startTime);
    arr.push(endTime);
    arr.push(id);

    // UPDATE reservations SET  title = '연예가중계', userName = '현빈', startTime = '10:00',endTime = '11:00' WHERE id = 10
    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('UPDATE reservations SET ' +
                                                      'title = ?, '+
                                                      'userName = ?, ' +
                                                      'startTime = ?, ' +
                                                      'endTime = ? WHERE id = ?', arr)
                                                      
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();

      // 결과 반환
      return rows;
    }
  }

  
// EX : SELECT * FROM reservations WHERE date = '2020-03-05'
async function getReservation(date, roomName) {

    console.log('getReservation : ' + date);
    console.log('getReservation : ' + roomName);

    let conn, rows;

    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('SELECT * FROM reservations WHERE date = ? AND roomName = ? ORDER BY startTime', [date, roomName]); // 쿼리 실행
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();
      return rows;
    }
  }

  // 1. id와 token 값을 받는다.
  // 2. token이 admin 인경우 혹은 일차하는 경우 삭제
  // 3. 그 외 삭제불가 통보
  async function delReservation(params){

    let conn, rows;

    var admin = 'admin';

    var id = params.id;
    var token = params.token;

    var arr = [];

    arr.push(id);
    arr.push(token);
    arr.push(admin);

    console.log('delReservation : ' + id);
    console.log('delReservation : ' + token);

    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('DELETE FROM reservations WHERE id = ? AND (token = ? OR token = ?)', arr);

    }catch (err) {throw err;}
    finally{
      if (conn) conn.end();
      return rows;
    }

  }

module.exports = { getRooms, 
    setUsers, 
    setReservation, 
    getReservation,
    delReservation,
    updateReservation
  }
