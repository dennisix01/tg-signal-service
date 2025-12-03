const express = require("express");
const app = express();

// middleware per leggere testo puro
app.use(express.text({ type: "*/*" }));

// qui teniamo in RAM l'ultimo segnale
let lastSignal = "";

// endpoint per SET del segnale (chiamato dal Worker)
app.post("/set_signal", (req, res) => {
  const text = (req.body || "").trim();
  if (!text) {
    return res.status(400).send("No text");
  }
  lastSignal = text;
  console.log("Nuovo segnale salvato:", lastSignal);
  res.send("OK");
});

// endpoint per GET del segnale (chiamato dal Worker / EA)
app.get("/signal", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(lastSignal || "");
});

// porta per Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server in ascolto su port", PORT);
});
