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

    var arr = [];
    arr.push(title);
    arr.push(date);
    arr.push(userName);
    arr.push(roomName);
    arr.push(startTime);
    arr.push(endTime);
    arr.push(token);

    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('INSERT INTO reservations VALUES (id, ?, ?, ?, ?, ?, ? ,?)', arr); // 쿼리 실행
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();
      return rows;
    }
  }

  
// EX : SELECT * FROM reservations WHERE date = '2020-03-05'
async function getReservation(date) {

    console.log('getReservation : ' + date);

    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query('USE my_db'); // 사용할 DB 명시
      rows = await conn.query('SELECT * FROM reservations WHERE date = ?', [date]); // 쿼리 실행
    }
    catch (err) { throw err; }
    finally {
      if (conn) conn.end();
      return rows;
    }
  }

module.exports = { getRooms, 
    setUsers, 
    setReservation, 
    getReservation}