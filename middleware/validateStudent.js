const Student = require("../models/Student");

exports.validateStudent = async (req, res, next) => {
  const { name, birthday, email } = req.body;

  const currentDate = new Date();
  const studentBirthday = new Date(birthday);
  if (studentBirthday >= currentDate) {
    return res.status(400).send("Ngày sinh phải nhỏ hơn ngày hiện tại.");
  }

  const existingStudent = await Student.getByEmail(email);
  if (existingStudent) {
    return res.status(400).send("Email đã tồn tại trong hệ thống.");
  }

  if (!name || !birthday || !email) {
    return res.status(400).send("Các trường không được để trống.");
  }

  next();
};

exports.handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Lỗi xảy ra trên máy chủ.");
};
