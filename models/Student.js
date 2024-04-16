const db = require("./Database.js");

module.exports = class Student {
  static getAll() {
    let sql = `SELECT * FROM students`;
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static getById(id) {
    console.log(id);
    let sql = `SELECT * FROM students WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], function (err, data) {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }

  static add(studentData) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO students (name, birthday, phone, address, gender, email) VALUES (?, ?, ?, ?, ?, ?)`;
      let values = [
        studentData.name,
        studentData.birthday,
        studentData.phone,
        studentData.address,
        studentData.gender,
        studentData.email,
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static update(id, studentData) {
    let sql = `UPDATE students SET name = ?, birthday = ?, phone = ?, address = ?, gender = ?, email = ? WHERE id = ?`;
    let values = [
      studentData.name,
      studentData.birthday,
      studentData.phone,
      studentData.address,
      studentData.gender,
      studentData.email,
      id,
    ];
    return new Promise((resolve, reject) => {
      db.query(sql, values, function (err, data) {
        if (err) reject(err);
        resolve(data.affectedRows > 0);
      });
    });
  }

  static getByEmail(email) {
    let sql = `SELECT * FROM students WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [email], function (err, data) {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }

  static delete(id) {
    let sql = `DELETE FROM students WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], function (err, data) {
        if (err) {
          reject(err);
        } else {
          if (data && data.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
};
