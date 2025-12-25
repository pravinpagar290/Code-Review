const express = require("express");
const aiRoutes = require("./routes/code-review.routes");
const notesRoutes = require("./routes/notes.routes");
const cors = require("cors");

const app = express();

// Allow only the frontend origin and enable cookies/credentials
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/ai", aiRoutes);
app.use("/api/notes", notesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error in request:", err);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
