const express = require("express");
const { updateTaskCompletion } = require("../controllers/taskControllers");

const router = express.Router();

// Index
router.get("/", (req, res) => {
  res.send("Lista delle task");
});

// Create
router.post("/", (req, res) => {
  res.send("Creazione nuova task");
});

// Update
router.put("/:id", (req, res) => {
  res.send(`Modifica della task: ${req.params.id}`);
});

// Delete
router.delete("/:id", (req, res) => {
  res.send(`Eliminazione della task ${req.params.id}`);
});

// Sostituzione della funzione per la rotta PUT
router.put("/:id/completed", updateTaskCompletion);

module.exports = router;
