const express = require("express");
const StudentsController = require("../controllers/StudentController");
const { validateStudent } = require("../middleware/validateStudent");
const router = express.Router();
//GET
router.get("/list-student", StudentsController.getStudents);
//ADD
router.post("/add-student", validateStudent, StudentsController.postAddStudent);
//GET DETAIL
router.get("/student-detail/:studentId", StudentsController.getStudentById);
//UPDATE
router.post(
  "/edit-student/:studentId",
  validateStudent,
  StudentsController.postEditStudent
);
//DELETE
router.post("/delete-student/:studentId", StudentsController.postDeleteStudent);

module.exports = router;
