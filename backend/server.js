require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Log unhandled errors so we can diagnose connection resets
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
