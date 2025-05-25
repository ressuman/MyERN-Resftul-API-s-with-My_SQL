// File:controllers/studentControllers.js

const db = require("../connection/db/database");
const colors = require("colors");

// Get all students (excluding soft-deleted)
const getAllStudents = async (req, res) => {
  try {
    const pool = db.getPool();

    const [rows] = await pool.query(
      "SELECT * FROM students WHERE deletedAt IS NULL"
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No students found",
        description: "There are no students in the database",
      });
    }

    res.status(200).json({
      status: true,
      message: "Students fetched successfully",
      description: "List of all students excluding soft-deleted",
      totalStudents: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("❌ Error fetching students:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error fetching students",
      message: error.message,
    });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const { name, rol_no, fees, class: studentClass, medium } = req.body;
    if (!name || !rol_no || !fees || !studentClass || !medium) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
        description: "Please provide all required fields",
      });
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      "INSERT INTO students (name, rol_no, fees, class, medium) VALUES (?, ?, ?, ?, ?)",
      [name, rol_no, fees, studentClass, medium]
    );
    if (!result || result.affectedRows === 0) {
      return res.status(500).json({
        status: false,
        message: "Failed to create student",
        description: "There was an issue creating the student record",
      });
    }

    res.status(201).json({
      status: true,
      message: "Student created successfully",
      description: "New student has been added",
      data: {
        name,
        rol_no,
        fees,
        class: studentClass,
        medium,
      },
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error creating student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error creating student",
      message: error.message,
    });
  }
};

// Full update
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Student ID is required",
      });
    }

    const { name, rol_no, fees, class: studentClass, medium } = req.body;
    const pool = db.getPool();

    const [result] = await pool.query(
      `UPDATE students
     SET name = ?, rol_no = ?, fees = ?, class = ?, medium = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE id = ? AND deletedAt IS NULL`,
      [name, rol_no, fees, studentClass, medium, id]
    );

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Student not found or already deleted",
        description: "No student found with the provided ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Student updated successfully",
      description: "Student details have been updated",
      data: {
        id,
        name,
        rol_no,
        fees,
        class: studentClass,
        medium,
      },
    });
  } catch (error) {
    console.error("❌ Error updating student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error updating student",
      message: error.message,
    });
  }
};

// Soft delete
const softDeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Student ID is required",
      });
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      "UPDATE students SET deletedAt = CURRENT_TIMESTAMP WHERE id = ? AND deletedAt IS NULL",
      [id]
    );

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Student not found or already deleted",
        description: "No student found with the provided ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Student soft deleted",
      description: "Student has been marked as deleted",
      data: {
        id,
        deletedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Error soft deleting student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error soft deleting student",
      message: error.message,
    });
  }
};

// Hard delete
const hardDeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Student ID is required",
      });
    }

    const pool = db.getPool();
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [
      id,
    ]);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
        description: "No student found with the provided ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Student permanently deleted",
      description: "Student has been permanently removed from the database",
      data: {
        id,
      },
    });
  } catch (error) {
    console.error("❌ Error hard deleting student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error hard deleting student",
      message: error.message,
    });
  }
};

// Get one student by ID
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Student ID is required",
      });
    }

    const pool = db.getPool();
    const [rows] = await pool.query(
      "SELECT * FROM students WHERE id = ? AND deletedAt IS NULL",
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
        description: "No student found with the provided ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Student fetched successfully",
      description: "Details of the student",
      data: rows[0],
    });
  } catch (error) {
    console.error("❌ Error fetching student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error fetching student",
      message: error.message,
    });
  }
};

// Patch student (partial update)
const patchStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Student ID is required",
      });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No data provided for update" });
    }

    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    values.push(id);

    const pool = db.getPool();
    const [result] = await pool.query(
      `UPDATE students SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND deletedAt IS NULL`,
      values
    );

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Student not found or already deleted",
        description: "No student found with the provided ID",
      });
    }

    res.status(200).json({
      status: true,
      message: "Student partially updated",
      description: "Some fields have been updated",
      data: updates,
    });
  } catch (error) {
    console.error("❌ Error patching student:".red, error.message.yellow);

    res.status(500).json({
      status: false,
      description: "Error patching student",
      message: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  softDeleteStudent,
  hardDeleteStudent,
  getStudent,
  patchStudent,
};
