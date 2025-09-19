const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  updateTaskCompletion,
} = require("../controllers/taskControllers");

const router = express.Router();

// Definizione delle rotte
router.get("/", getAllTasks); // Ottieni tutte le task
router.post("/", createTask); // Crea una nuova task
router.put("/:id", updateTask); // Aggiorna una task
router.put("/:id/completed", updateTaskCompletion); // Aggiorna lo stato di completamento di una task
router.delete("/:id", deleteTask); // Elimina una task

module.exports = router;
