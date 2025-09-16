const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

// Definisci una rotta per la homepage
app.get("/", (req, res) => {
  res.send("Benvenuto nella tua prima applicazione Express!");
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});