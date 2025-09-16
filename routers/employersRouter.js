const express = require('express')

const router = express.Router()

// Index
router.get('/', (req, res) => {
    res.send('Lista delle task')
})

// Create
router.post('/', (req, res) => {
    res.send('Creazione nuovo dipendente')
})

// Update
router.put('/:id', (req, res) => {
    res.send(`Modifica della task: ${req.params.id}`)
})

// Delete
router.delete('/:id', (req, res) => {
    res.send(`Eliminazione della task ${req.params.id}`)
})

module.exports = router