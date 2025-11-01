const express = require("express");
const goalsRoutes = require("./routes/goal.routes");
const cors = require("cors");

const app = express();
const port = 4001;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", goalsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
