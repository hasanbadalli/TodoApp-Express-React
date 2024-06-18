const taskDataBase = require("../models/taskDataBase");
let { taskDB } = taskDataBase;

const taskGetter = (req, res) => {
  res.json(taskDataBase.taskDB);
};

const taskAdder = (req, res) => {
  console.log(req.body);
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newTask = { id: taskDB.length + 1, text: text, completed: false };
  taskDB.push(newTask);
  res.status(201).json(newTask);
};

const taskComplete = (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({ error: "Task Status and id Required" });
  }
  const taskIndex = taskDB.findIndex((item) => item.id == id);
  if (taskIndex == -1) {
    return res.status(404).json({ error: "Task is not found" });
  }
  taskDB[taskIndex].completed = !taskDB[taskIndex].completed;
  res.status(200).json(taskDB[taskIndex]);
};

const taskDelete = (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined)
      return res.status(400).json({ error: "Task id is required" });
    const taskIndex = taskDB.findIndex((item) => item.id == id);
    if (taskIndex === -1)
      return res.status(404).json({ error: "Task is not found" });
    //taskDB = taskDB.filter((item) => item.id != id);
    taskDB.splice(taskIndex, 1)
    res.status(200).json(taskDB);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = { taskGetter, taskAdder, taskComplete, taskDelete };
