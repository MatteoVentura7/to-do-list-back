const express = require("express");
const validationIdParam = require("../middlewares/validationIdParam");
const taskController = require("../controllers/taskController");

const router = express.Router();

const cors = require("cors");

router.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware per verificare il parametro ID delle rotte
router.use("/:id", validationIdParam);

// Index
router.get("/", taskController.index);

// Create
router.post("/", taskController.store);

// Update
router.put("/:id", taskController.update);

// Delete
router.delete("/:id", taskController.destroy);

module.exports = router;