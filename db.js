const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "13579Matteo",
  database: "db_task",
});

function connectToDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error("Errore di connessione al database:", err.message);
      setTimeout(connectToDatabase, 2000); // Riprova la connessione dopo 2 secondi
    } else {
      console.log("Connesso a MySQL!");
    }
  });

  connection.on("error", (err) => {
    console.error("Errore del database:", err.message);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connectToDatabase(); // Riconnessione automatica
    } else {
      throw err;
    }
  });
}

connectToDatabase();

module.exports = connection;
