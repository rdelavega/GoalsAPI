const express = require("express");
const goalsRoutes = require("./routes/goal.routes");

const app = express();
const port = 4001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", goalsRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
