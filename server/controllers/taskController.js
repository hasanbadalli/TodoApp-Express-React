const taskDataBase = require("../models/taskDataBase");
const {taskDB} = taskDataBase

const taskAdder = (req, res) => {
  console.log(req.body)
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newTask = { id: taskDB.length + 1, text: text };
  taskDB.push(newTask);
  res.status(201).json(newTask);
};

module.exports = { taskAdder };
