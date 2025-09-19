const connection = require("../db");

// Funzione per ottenere tutte le task
const getAllTasks = (req, res) => {
  const query = "SELECT * FROM tasks";
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Errore nel server");
    }
    res.json(results);
  });
};

// Funzione per aggiungere una nuova task
const createTask = (req, res) => {
  const { texts } = req.body;
  const query = "INSERT INTO tasks (texts) VALUES (?)";
  connection.query(query, [texts], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }
    res
      .status(201)
      .json({ message: "Task aggiunta con successo", taskId: result.insertId });
  });
};

// Funzione per aggiornare una task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { texts } = req.body;
  const query = "UPDATE tasks SET texts = ?  WHERE id = ?";
  connection.query(query, [texts, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }
    res
      .status(201)
      .json({ message: "Task aggiornata con successo", texts: texts });
  });
};

// Funzione per eliminare una task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Errore nel server");
    }
    res.send("Task eliminata con successo");
  });
};

// Funzione per aggiornare lo stato di completamento di una task
const toggleTaskCompletion = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE tasks SET completed = NOT completed WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task non trovata" });
    }

    // Recupera il nuovo stato della task
    const fetchQuery = "SELECT id, completed FROM tasks WHERE id = ?";
    connection.query(fetchQuery, [id], (fetchErr, fetchResults) => {
      if (fetchErr) {
        console.error(fetchErr);
        return res.status(500).json({ error: "Errore nel server" });
      }

      res.json({
        message: "Stato di completamento aggiornato con successo",
        task: fetchResults[0],
      });
    });
  });
};

// Esporta le funzioni
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion, // Esporta la nuova funzione
};
