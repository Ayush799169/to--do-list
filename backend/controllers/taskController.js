
const taskService = require("../services/taskService");
 // GET all tasks
    const getTasks = async (req, res) => {
   try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// CREATE new task
   const createTask = async (req, res) => {
      try {
    const { title } = req.body;

  // check title
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const cleanTitle = title.trim();

    const newTask = await taskService.createTask(cleanTitle);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// UPDATE task title
  const updateTask = async (req, res) => {
     try {
    const taskId = req.params.id;
    const { title } = req.body;

 // check title
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const updatedTask = await taskService.updateTask(
      taskId,
      title.trim()
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

  // DELETE task
    const deleteTask = async (req, res) => {
       try {
    const taskId = req.params.id;

    const deletedTask =
      await taskService.deleteTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

// TOGGLE completed status
  const updateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task =
      await taskService.toggleTaskStatus(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status",
    });
  }
};

// SEARCH tasks
  const searchTasks = async (req, res) => {
  try {
    const query = req.query.q || "";

    const tasks =
      await taskService.searchTasks(query);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, updateStatus, searchTasks, };