const Task = require("../models/task");

// get all tasks 
  const getAllTasks = async () => {
  const tasks = await Task.find().sort({
    createdAt: -1,
  });
  return tasks;
};

// create new task
 const createTask = async (title) => {
  const newTask = await Task.create({
    title: title,
    completed: false,
  });
  return newTask;
};

// update task title
 const updateTask = async (id, title) => {
  const updatedTask =
    await Task.findByIdAndUpdate(
      id,
      { title: title },
      { new: true }
    );
  return updatedTask;
};

// delete task
 const deleteTask = async (id) => {
  const deletedTask =
    await Task.findByIdAndDelete(id);
  return deletedTask;
};

// change completed 
 const toggleTaskStatus = async (id) => {
  const task = await Task.findById(id);

  // check task exist or not
  if (!task) {
    return null;
  }
  task.completed = !task.completed;
  await task.save();
  return task;
};

// search tasks by title
 const searchTasks = async (query) => {
  const tasks = await Task.find({
    title: {
      $regex: query,
      $options: "i",
    },
  }).sort({
    createdAt: -1,
  });
  return tasks;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, toggleTaskStatus, searchTasks,};