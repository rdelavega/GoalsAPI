const express = require("express");
const { goals } = require("./data/goals.json");

const app = express();
const port = 4001;

app.get("/goals", (req, res) => {
  res.send(goals);
  console.log(goals[0]);
});

app.get("/goals/:id", (req, res) => {
  try {
    const { id } = req.params;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].id == id) {
        res.status(200).send(goals[i]);
        console.log(goals[i]);
      } else {
        throw error;
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Goal not found!" });
  }
});

app.post("/goals", (res, req) => {
  const { goalData } = req.body;
  goals.push(goalData);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
