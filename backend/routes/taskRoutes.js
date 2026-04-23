
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, updateStatus, searchTasks } = require('../controllers/taskController');


router.get("/search", searchTasks);
router.put("/status/:id", updateStatus);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;