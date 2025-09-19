const express = require('express')
const { toggleTaskCompletion } = require("../controllers/taskControllers");

const router = express.Router()

// Index
router.get('/', (req, res) => {
    res.send('Lista delle task')
})

// Create
router.post('/', (req, res) => {
    res.send('Creazione nuova task')
})

// Update
router.put('/:id', (req, res) => {
    res.send(`Modifica della task: ${req.params.id}`)
})

// Delete
router.delete('/:id', (req, res) => {
    res.send(`Eliminazione della task ${req.params.id}`)
})

// Toggle completion
router.patch('/:id/completed', (req, res) => {
    toggleTaskCompletion(req, res);
});

module.exports = router