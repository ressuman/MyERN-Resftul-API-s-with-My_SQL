// File: routes/studentRoutes.js

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentControllers");
const {
  getAllStudents,
  createStudent,
  updateStudent,
  softDeleteStudent,
  hardDeleteStudent,
  getStudent,
  patchStudent,
} = studentController;

// Define routes for student management
router.get("/all", getAllStudents); // Get all students

router.post("/new", createStudent); // Create a new student

router.get("/:id/student", getStudent); // Get a specific student by ID

router.patch("/patch/:id", patchStudent); // Partial update a specific student by ID

router.put("/update/:id", updateStudent); //Full update a specific student by ID

router.delete("/soft-delete/:id", softDeleteStudent); // Soft delete a specific student by ID

router.delete("/hard-delete/:id", hardDeleteStudent); // Hard delete a specific student by ID

module.exports = router;
