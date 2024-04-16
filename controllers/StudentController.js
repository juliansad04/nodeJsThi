const path = require("path");
const Student = require("../models/Student");
const fs = require("fs");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.getAll();
    await res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postAddStudent = async (req, res, next) => {
  try {
    const { name, birthday, phone, address, gender, email } = req.body;

    const studentData = { name, birthday, phone, address, gender, email };

    await Student.add(studentData);

    res.status(200).send("Create student successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postEditStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const { name, birthday, phone, address, gender, email } = req.body;

    const studentData = { name, birthday, phone, address, gender, email };

    await Student.update(studentId, studentData);

    res.status(200).send("Update student sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postDeleteStudent = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    await Student.delete(studentId);
    res.status(200).send("Delete student sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.getById(studentId);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
