const express = require("express");
const db = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Usa il middleware CORS
app.use(cors());

// Importazione midddleware

const validationIdParam = require("./middlewares/validationIdParams.js");
// ROUTER
const employersRouter = require("./routers/employersRouter");
const taskRouter = require("./routers/tasksRouter");

// Middleware per il parsing del body in formato JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server del mio Blog");
});

// Registro le rotte

app.use("/tasks", taskRouter);
app.use("/employers", employersRouter);

// middleware che gestisce gli errori 404
app.use(validationIdParam);

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
