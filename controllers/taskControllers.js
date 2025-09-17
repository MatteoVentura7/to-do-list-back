
const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Index
const index = (req, res) => {
  let tasksFiltered = readTasks();
  const { text } = req.query;

  if (text) {
    tasksFiltered = tasksFiltered.filter((task) =>
      task.texts.includes(text)
    );
  }

  res.json(tasksFiltered);
};


// Create
const create = (req, res) => {
  const { texts, completed = false } = req.body;
  if (!texts) {
    return res.status(400).json({ error: "Il campo 'texts' è obbligatorio" });
  }
  const tasks = readTasks();
  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    texts,
    completed,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

// Update

const update = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((elm) => elm.id == req.params.id);
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  if (req.body.texts !== undefined) task.texts = req.body.texts;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  writeTasks(tasks);
  res.json(task);
};

// Delete
const destroy = (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((elm) => elm.id == req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "task not found" });
  }
  tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  res.sendStatus(204);
};



module.exports = { index, create, destroy, update };

