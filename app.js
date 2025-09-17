const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors');
app.use(express.static("public"));
app.use(express.json());


// Importa il router dei task
const tasksRouter = require("./routers/tasksRouter");
app.use("/tasks", tasksRouter);

app.use(cors());
// Definisci una rotta per la homepage
app.get("/", (req, res) => {
  res.send("Benvenuto !");
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});