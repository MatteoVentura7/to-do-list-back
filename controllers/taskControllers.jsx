
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



module.exports = { index, destroy , update };

