
// Import dei dati
const tasksData = require("../data/tasksData");

// Index
const index = (req, res) => {
  let tasksFiltered = tasksData;
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
  const newId = tasksData.length > 0 ? Math.max(...tasksData.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    texts,
    completed,
  };
  tasksData.push(newTask);
  res.status(201).json(newTask);
};

// Update

const update = (req, res) => {
  const task = tasksData.find((elm) => elm.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "task not found",
    });
  }

  task.texts = req.body.texts;

  res.json(task);
};

// Delete
const destroy = (req, res) => {
  const task = tasksData.find((elm) => elm.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "task not found",
    });
  }

  tasksData.splice(tasksData.indexOf(task), 1);

  res.sendStatus(204);
};



module.exports = { index, create, destroy, update };

