const express = require("express");
const { goals } = require("./data/goals.json");
const goalsRoutes = require("./routes/goal.routes");

const app = express();
const port = 4001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", goalsRoutes);

app.use((error, req, res, next) => {
  res.status(500).send("Ups, something went wrong");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
