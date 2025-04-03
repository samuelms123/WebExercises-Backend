import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (userData, id, role, currentUserId) => {
  if (role === 'admin') {
    const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
      userData,
      id,
    ]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } else {
    const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
      userData,
      currentUserId,
    ]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  }
};

const removeUser = async (id, role, currentUserId) => {
  if (role === 'admin') {
    const [rows] = await promisePool.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } else {
    const [rows] = await promisePool.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [currentUserId]
    );
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  }
};

const login = async (user) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;

  const [rows] = await promisePool.execute(sql, [user]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {listAllUsers, findUserById, addUser, login, modifyUser, removeUser};
